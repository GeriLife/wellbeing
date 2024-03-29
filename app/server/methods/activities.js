/**
 * @namespace Activities
 */

import _ from 'lodash';
import d3 from 'd3';
import moment from 'moment';
import { isCurrentUserAdmin } from '../utils/user';
import { getActivityWithHomes, aggregateActivitiesWithHome, mergeHomes }from './activityReports';

/**
 * @memberof Activities
 * @name getAllHomeReportAggregates
 * @description Aggregate activities based on facilitator name and activity type name and at weekly and monthly granularity
 *
 * @returns {Object} 4 keys having weekly and monthly data for facilitator name and activity type each.
 */
function getAllHomeReportAggregates() {
  try {
    const weeklyDataByActivityType = Meteor.call(
      'getAggregatedActivities',
      'week',
      'activityTypeName'
    );
    const monthlyDataByActivityType = Meteor.call(
      'getAggregatedActivities',
      'month',
      'activityTypeName'
    );
    const weeklyDataByActivityFacilitator = Meteor.call(
      'getAggregatedActivities',
      'week',
      'facilitatorName'
    );
    const monthlyDataByActivityFacilitator = Meteor.call(
      'getAggregatedActivities',
      'month',
      'facilitatorName'
    );

    return {
      weeklyDataByActivityType,
      monthlyDataByActivityType,
      weeklyDataByActivityFacilitator,
      monthlyDataByActivityFacilitator,
    };
  } catch (e) {
    console.error(e);
    return { error: true, errorMessage: e.toString() };
  }
}

/**
 * @memberof Activities
 * @name PrepareFilters
 * @description To prepare mongo filter json object. Selects activities of a given activity type and one or more residents
 * @param {String} activityTypeId
 * @param {String} residentId
 * @param {Array} userVisibleActiveResidentIds
 * @returns {Object}
 */
function prepareFilters(
  activityTypeId,
  residentId,
  userVisibleActiveResidentIds
) {
  const condition = {
    $and: [],
  };
  /*
      Using elemMatch to find at least one match from residentIds
      array (of the collection) from the given array or filtered residentId
      */
  if (!!residentId) {
    // if a specific resident id is filtered
    condition.$and.push({
      residentIds: {
        $elemMatch: { $eq: residentId },
      },
    });
  } else {
    condition.$and.push({
      residentIds: {
        $elemMatch: { $in: userVisibleActiveResidentIds },
      },
    });
  }

  /* Filtered activity type */
  if (!!activityTypeId) {
    condition.$and.push({ activityTypeId });
  }
  return condition;
}

/**
 * @memberof Activities
 * @name aggregateActivitiesAndPopulateAggregateCollection
 * @description Method call by aggregate cron job. It aggregates data for all reports page,
 * removes all past data and adds the freshly aggregated data to the aggregate collection.
 */
function aggregateActivitiesAndPopulateAggregateCollection() {
  /* Return empty array if activity collection is empty */
  if (Activities.find().count() === 0) {
    AllHomesActivityReportAggregate.remove({});
    return
  }

  /* Get monthly data */
  Meteor.call('getAllHomeReportAggregates', function (error, data) {
    if (error || data.error === true) return;

    /* Remove previous entries, if any so that after the following insert
      there is always only one entry in the collection */
    AllHomesActivityReportAggregate.remove({});
    const lastUpdatedDate = new Date();

    /* Prepare data for insert adding 2 rows as per type because retrieval will be easy */
    const activityTypeData = {
      lastUpdatedDate,
      weeklyData: data.weeklyDataByActivityType,
      aggregateBy: 'type',
      monthlyData: data.monthlyDataByActivityType,
    };
    const facilitatorData = {
      lastUpdatedDate,
      weeklyData: data.weeklyDataByActivityFacilitator,
      aggregateBy: 'facilitator',
      monthlyData: data.monthlyDataByActivityFacilitator,
    };

    /* Insert Data */
    AllHomesActivityReportAggregate.insert(activityTypeData, function (
      error
      ) {
        if (error) console.error('activityTypeData: ', error);
      });

    AllHomesActivityReportAggregate.insert(facilitatorData, function (
      error
    ) {
      if (error) console.error('facilitatorData: ', error);
    });
  });
}

/**
 * @memberof Activities
 * @name saveActivity
 * @description Add new activity if doesn't exist else update.
 * Only admin can update an activity where else any type of user can add new activity.
 *
 * @param {Object} formData contains form keys in create mode,
 * else has the _id key and modifier key (i.e. the mongo modifier object)
 * @returns returns remove output
 */
function saveActivity(formData) {
  const currentUserIsAdmin = Roles.userIsInRole(
    this.userId,
    'admin'
  );

  if (!formData._id) {
    return Activities.insert(formData);
  } else if (currentUserIsAdmin) {
    const { _id, modifier } = formData;

    return Activities.update({ _id }, modifier);
  }

  throw new Meteor.Error(500, 'Operation not allowed');
}

/**
 * @memberof Activities
 * @name removeActivity
 * @description Remove selected activity. Only admin can remove an activity.
 *
 * @param {String} activityId
 * @returns returns remove output
 */
function removeActivity(activity) {

  if (!isCurrentUserAdmin(this.userId)) {
    throw new Meteor.Error(500, 'Operation not allowed');
  }

  return Activities.remove(typeof activity === 'string' ? activity : activity.id);
}

/**
 * @memberof Activities
 * @name getActivityById
 * @description Get activity with facilitator and activity details
 *
 * @param {String} activityId
 * @returns {Object} activity by id
 */
function getActivityById(activityDetail) {
  const activity = Activities.findOne({ _id: activityDetail.id });
  activity.activityType = ActivityTypes.findOne({
    _id: activity.activityTypeId,
  });
  activity.facilitatorRole = Meteor.roles.findOne({
    _id: activity.facilitatorRoleId,
  });
  activity.residents = activity.residentIds.map((resident) => {
    const residentDetail = Residents.find({
      _id: resident,
    }).fetch()[0];
    return {
      label: residentDetail.fullName(),
      value: residentDetail._id,
    };
  });

  return activity;
}

export default Meteor.methods({
  /**
   * @memberof Activities
   * @name annotateActivities
   * @description For the given activities, map the activity types ids and facilitator ids to their names
   *
   * @param {Array} activities
   * @returns {Array}
   */
  annotateActivities(activities) {
    /*
    Given an array of Activity objects
    add 'activityTypeName' attribute

    recipe by William Schroeder McKinley:
    https://stackoverflow.com/a/46248696
    */

    // get activity types, flatten to lookup dict
    // key: activityTypeId
    // value: activityTypeName
    const activityTypes = ActivityTypes.find().fetch();
    const facilitators = Meteor.roles.find().fetch();

    const activityTypesDict = _(activityTypes)
      .keyBy('_id')
      .mapValues('name')
      .value();
    const facilitatorDict = _(facilitators)
      .keyBy('_id')
      .mapValues('name')
      .value();

    // map over activity objects
    // add attributes to each
    //  - activityTypeName
    //  - facilitatorRoleName
    return _.map(activities, function (activity) {
      const activityTypeId = activity.activityTypeId;
      const facilitatorRoleId = activity.facilitatorRoleId;

      activity['activityTypeName'] =
        activityTypesDict[activityTypeId];
      activity['facilitatorName'] =
        facilitatorDict[facilitatorRoleId];

      return activity;
    });
  },

  /**
   * @memberof Activities
   * @name aggregateActivities
   * @description Aggregate activities get activity count and sum of minutes of the activities
   *
   * @param {Array} annotatedActivities array of activities
   * @param {String} timePeriod time aggregation granularity. (week or monthly)
   * @param {string} [aggregateBy='activityTypeName'] aggregate parameter
   * @returns {Array} nested array of activities with total count of activities and sum of minutes of activities,
   * aggregated by time and either activity type or facilitator name
   */
  aggregateActivities(
    annotatedActivities,
    timePeriod,
    aggregateBy = 'activityTypeName'
  ) {
    // aggregate activities into daily bins grouped by type
    //  - activity count
    //  - activity minutes
    /* groupedData = [
    *      [
    *        "Itse",
    *        [
    *          [
    *            "jan-2019",
    *            [
    *              {
    *                "activity_count": 1,
    *                "activity_minutes": 3
    *              }
    *            ]
    *          ]
    *        ]
    *      ]
    *    ]
    */
   const groupedData = d3.groups(annotatedActivities,
        function (activity) {
          /* Whether to group by facilitator or activity type */
          return activity[aggregateBy];
        },
        function (activity) {
          /* Granularity week or month */
          return moment(activity.activityDate)
            .startOf(timePeriod)
            .toDate();
        }
      );
    
    return groupedData.map(function (dailyActivities) {
      return {
        key: dailyActivities[0],
        values: dailyActivities[1].map((activity) => ({
          key: activity[0],
          value: {
            activity_count: activity[1].length,
            activity_minutes: d3.sum(activity[1], function (a) {
              return parseFloat(a.duration);
            }),
          },
        })),
      };
    });
  },

  getAllHomeReportAggregates,

  /**
   * @memberof Activities
   * @name getDailyAggregatedHomeResidentActivities
   * @description get daily count and time of activities
   *
   * @param {String} homeId home for which daily activity aggregate is required
   * @returns {Array} nested array of aggregated activities
   */
  getDailyAggregatedHomeResidentActivities(homeId) {
    // Get all home activities
    const allHomeActivities = Meteor.call(
      'getAllHomeResidentActivities',
      homeId
    );

    // annotate activities with name and facilitator role
    const annotatedActivities = Meteor.call(
      'annotateActivities',
      allHomeActivities
    );

    // aggregate activities into daily bins grouped by type
    //  - activity count
    //  - activity minutes
    /* 
    * groupedData = [
    *      [
    *        "Itse",
    *        [
    *          [
    *            "jan-2019",
    *            [
    *              {
    *                "activity_count": 1,
    *                "activity_minutes": 3
    *              }
    *            ]
    *          ]
    *        ]
    *      ]
    *    ]
    */
    const groupedData = d3.groups(
      annotatedActivities,
      function (activity) {
        return activity.activityTypeName;
      },
      function (activity) {
        return moment(activity.activityDate).startOf('day').toDate();
      }
    );

    return d3.rollup(groupedData, function (activityByAggregate) {
      return {
        key: activityByAggregate[0],
        values: activityByAggregate[1].map((timeAggregate) => ({
          key: timeAggregate[0],
          value: {
            activity_count: timeAggregate[1].length,
            activity_minutes: d3.sum(timeAggregate[1], function (a) {
              return parseFloat(a.duration);
            }),
          },
        })),
      };
    });
  },

  /**
   * @memberof Activities
   * @name getAggregatedActivities
   *
   * @param {String} timePeriod  time aggregation granularity. (week or monthly)
   * @param {String} aggregateBy aggregate parameter
   * @returns nested array of activities with total count of activities and sum of minutes of activities,
   * aggregated by time and either activity type or facilitator name
   */
  getAggregatedActivities(timePeriod, aggregateBy) {
    const activities = getActivityWithHomes();

    // TODO: work out how to annotate the aggregated data,
    // rather than all individual activities
    // to increase performance of this function
    const annotatedActivities = Meteor.call(
      'annotateActivities',
      activities
    );

    return aggregateActivitiesWithHome(
      annotatedActivities,
      timePeriod,
      aggregateBy
    );
  },

  /**
   * @memberof Activities
   * @name getActivitiesAggregateReportApi
   * @description Api for getActivitiesAggregateReport.
   *
   * @param {param[0].String} timePeriod time aggregation granularity. (week or monthly)
   * @param {param[0].String} aggregateBy aggregate parameter
   * @returns {Object} Aggregate report data and last aggregated on date.
   */
    getActivitiesAggregateReportApi({ timePeriod, aggregateBy }) {
    return Meteor.call("getActivitiesAggregateReport", timePeriod, aggregateBy, this.userId);
  },

  /**
   * @memberof Activities
   * @name getActivitiesAggregateReport
   * @description Get aggregated homes report from the pre aggregated data.
   * If there aggregation collection is empty populate it.
   *
   * @param {String} timePeriod time aggregation granularity. (week or monthly)
   * @param {String} aggregateBy aggregate parameter
   * @returns {Object} Aggregate report data and last aggregated on date.
   */
  getActivitiesAggregateReport(timePeriod, aggregateBy, userId) {
    if (!aggregateBy)
      throw new Meteor.Error('Required aggregateBy field');
    const homeIds = Meteor.call('getUserVisibleHomeIds', Meteor.userId() || userId);

    /* Key to selected based on time period */
    const fieldSelector =
      timePeriod === 'week' ? 'weeklyData' : 'monthlyData';

    /* If collection is empty, prefill it */
    const aggregateCount = AllHomesActivityReportAggregate.find().count();
    try {
      if (aggregateCount === 0) {
        Meteor.call(
          'aggregateActivitiesAndPopulateAggregateCollection'
        );
      }
    } finally {
      /* Pick an entry with the latest date */
      /*
      Todo: wait for meteor to support mongo filtering syntax or workaround for it
      const homeIdField = `${fieldSelector}.values.key`;
      Clause: { [homeIdField]: { $in: homeIds } }
      */
      const data = AllHomesActivityReportAggregate.findOne(
        { aggregateBy },
        {
          fields: { [fieldSelector]: 1, lastUpdatedDate: 1, _id: 0 },
        },
        { sort: { Date: -1, limit: 1 } }
      );
      return {
        activityData: data
          ? mergeHomes(data[fieldSelector], homeIds)
          : [],
        lastUpdated: data ? data.lastUpdatedDate : null,
      };
    }
  },
  getResidentAggregatedActivitiesApi({ residentId, timePeriod }) {
    return Meteor.call(
      'getResidentAggregatedActivities',
      residentId,
      timePeriod
    );
  },

  /**
   * @memberof Activities
   * @name getResidentAggregatedActivities
   * @description Aggregate activities of a resident on weekly or monthly basis
   *
   * @param {String} residentId resident for whom the activity aggregate is required
   * @param {String} timePeriod time level granularity to use for aggregation
   * @returns {Array} array aggregated by time period and activity type
   */
  getResidentAggregatedActivities(residentId, timePeriod) {
    const activities = Activities.find({
      residentIds: residentId,
    }).fetch();

    // TODO: work out how to annotate the aggregated data,
    // rather than all individual activities
    // to increase performance of this function
    const annotatedActivities = Meteor.call(
      'annotateActivities',
      activities
    );

    return Meteor.call(
      'aggregateActivities',
      annotatedActivities,
      timePeriod
    );
  },

  /**
   * @memberof Activities
   * @name getMonthlyAggregatedHomeResidentActivities
   * @description get monthly aggregate activities
   * @param {String} homeId Home for which activities are to be aggregated
   * @param {String} timePeriod time granularity
   * @returns {Array} list of aggregated activities
   */
  getMonthlyAggregatedHomeResidentActivities(homeId, timePeriod) {
    // Get all home activities
    const allHomeActivities = Meteor.call(
      'getAllHomeResidentActivities',
      homeId
    );

    // annotate activities with name and facilitator role
    const annotatedActivities = Meteor.call(
      'annotateActivities',
      allHomeActivities
    );

    return Meteor.call(
      'aggregateActivities',
      annotatedActivities,
      timePeriod
    );

  },

  getMonthlyAggregatedActivitiesByRoles({homeId, timePeriod}) {
    // Get all home activities
    const allHomeActivities = Meteor.call(
      'getAllHomeResidentActivities',
      homeId
    );

    // annotate activities with name and facilitator role
    const annotatedActivities = Meteor.call(
      'annotateActivities',
      allHomeActivities
    );

    return Meteor.call(
      'aggregateActivities',
      annotatedActivities,
      timePeriod,
      'facilitatorName'
    );
  },

  getMonthlyAggregatedHomeResidentActivitiesApi({
    homeId,
    timePeriod,
  }) {
    return Meteor.call(
      'getMonthlyAggregatedHomeResidentActivities',
      homeId,
      timePeriod
    );
  },

  /**
   * @memberof Activities
   * @name getAllHomeResidentActivities
   * @description get all activities for a given home's active residents
   *
   * @param {String} homeId
   * @returns {Array} list of activities
   */
  getAllHomeResidentActivities(homeId) {
    // Get all home Residencies
    const query = {
      homeId,
    };

    const homeResidencies = Residencies.find(query).fetch();

    // get activities for each resident during residency period
    const homeResidentsActivities = _.flatMap(
      homeResidencies,
      function (residency) {
        let homeActivitiesQuery = {
          residentIds: residency.residentId,
          activityDate: {
            $gte: residency.moveIn,
          },
        };

        // Check if residency has move out date
        if (residency.hasOwnProperty('moveOut')) {
          // set query to be before residency move out
          homeActivitiesQuery.activityDate['$lte'] =
            residency.moveOut;
        }

        return Activities.find(homeActivitiesQuery, {
          sort: {
            activityDate: 1,
          },
        }).fetch();
      }
    );

    // Sort home residents activities array by activity date
    return _.sortBy(homeResidentsActivities, 'activityDate');
  },

  /**
   * @memberof Activities
   * @name getResidentLatestActivityIdByType
   * @description get the activity type of the last activity entered in db
   *
   * @param {String} residentId
   * @param {String} activityTypeId
   * @returns {String} activity typeid
   */
  getResidentLatestActivityIdByType(residentId, activityTypeId) {
    /*
    Get the resident's most recent activity by type
    */
    var query = {
      activityTypeId: activityTypeId,
      residentIds: residentId,
    };
    // Set up sort by activity date, in descending order
    var sort = { sort: { activityDate: -1 } };

    // Get resident latest activity by type
    var residentLatestActivityByType = Activities.findOne(
      query,
      sort
    );

    // Return activity, if exists
    if (residentLatestActivityByType) {
      return residentLatestActivityByType._id;
    }
  },

  /**
   * @memberof Activities
   * @name getAllResidentsLatestActivityIdsByType
   * @description get activities of residents done most recently
   *
   * @param {String} activityTypeId
   * @returns {Array} array of resident with latest activity
   */
  getAllResidentsLatestActivityIdsByType(activityTypeId) {
    // Get all resident IDs
    var residentIds = Meteor.call('getAllResidentIds');

    // Placeholder for residents latest activity IDs
    var residentsLatestActivityIdsByType = [];

    // Loop through all resident IDs
    residentIds.forEach(function (residentId) {
      // Return resident latest activity
      var residentLatestActivityId = Meteor.call(
        'getResidentLatestActivityIdByType',
        residentId,
        activityTypeId
      );
      // If resident activity exists
      if (residentLatestActivityId !== undefined) {
        // Add resident latest activity ID to residents latest activity IDs array
        residentsLatestActivityIdsByType.push(
          residentLatestActivityId
        );
      }
    });

    if (residentsLatestActivityIdsByType) {
      // Return the array
      return residentsLatestActivityIdsByType;
    }
  },

  /**
   * @memberof Activities
   * @name getHomeCurrentResidentsActivityIds
   * @description get activities of all active residents added in a given time period
   *
   * @param {String} homeId Home to get activities for
   * @param {Number} period signifies a number of days to select period between (`today - period`) days and today
   * @returns {Array} list of activities
   */
  getHomeCurrentResidentsActivityIds({ homeId, period }) {
    /*
    Get all activities in past period
    for residents of a given home (provided by home ID)
    */

    // Get date period days ago (converting to JavaScript date)
    const previousDate = moment().subtract(period, 'days').toDate();

    // Get current resident IDs for given home
    const residentIds = Meteor.call(
      'getHomeCurrentAndActiveResidentIds',
      homeId
    );

    // Set up MongoDB query object
    // activities where one or more activity.residentIds matched in residentIds
    // (searching array field with array of values)
    // and activityDate greater than or equal to 'previousDate' (30 days ago)
    const query = {
      residentIds: {
        $elemMatch: {
          $in: residentIds,
        },
      },
      activityDate: {
        $gte: previousDate,
      },
    };

    // Get activities documents cursor
    const activities = Activities.find(query).fetch();

    // Create an array of activity IDs
    return _.map(activities, function (activity) {
      return activity._id;
    });
  },

  /**
   * @memberof Activities
   * @name getLatestActivityIds
   * @description gets all latest activities for each activity type
   *
   * @returns {Array} array of activity ids
   */
  getLatestActivityIds() {
    // Get all activity type IDs
    var activityTypeIds = Meteor.call('getAllActivityTypeIds');

    // Placeholder array for latest activity IDs
    var latestActivityIds = [];

    // Go through all activity types
    activityTypeIds.forEach(function (activityTypeId) {
      // Get latest activities for activity type
      var latestActivityIdsByType = Meteor.call(
        'getAllResidentsLatestActivityIdsByType',
        activityTypeId
      );

      // Add latest activity IDs to array
      latestActivityIds.push(latestActivityIdsByType);
    });

    // Flatten the latestActivityIds array
    return _.flatten(latestActivityIds);
  },

  /**
   * @memberof Activities
   * @name getActivityCountByActivityTypeId
   * @description get count of activities for a given type
   *
   * @param {String} activityTypeId
   * @returns {Number}
   */
  getActivityCountByActivityTypeId(activityTypeId) {
    // Get count of activities by activity type ID
    return Activities.find({ activityTypeId }).count();
  },

  /**
   * @memberof Activities
   * @name allUserVisibleActivities-paginated
   * @description Paginate activity list for a given user
   *
   * @param {Number}  currentPage data offset
   * @param {Number}  rowsPerPage data limit
   * @param {String}  activityTypeId used to filter based on given activity
   * @param {String}  residentId used to filter based on given resident
   *
   * @returns {Array}
   */
  'allUserVisibleActivities-paginated'({
    currentPage,
    rowsPerPage,
    activityTypeId,
    residentId,
    sortBy = 'activityDate',
    descending = true,
  }) {
    if (!this.userId) return;
    const departed = false;
    let userVisibleActiveResidentIds;

    if (!residentId) {
      userVisibleActiveResidentIds = Meteor.call(
        'getUserVisibleResidentIds',
        this.userId,
        departed
      );
    }

    // return mongo selector to fetch activities with matching resident IDs
    const condtionForActivities = prepareFilters(
      activityTypeId,
      residentId,
      userVisibleActiveResidentIds
    );
    const residentFullNameMap = Meteor.call(
      'getSelectedResidentDetails',
      []
    ).reduce(
      (acc, current) => ({
        ...acc,
        [current._id]: current.residentFullName,
      }),
      {}
    );
    const activityTypeMap = Meteor.call('getAllActivityTypes').reduce(
      (acc, curr) => ({ ...acc, [curr._id]: curr.name }),
      {}
    );

    const activityWithNamesMapped = Activities.find(
      condtionForActivities,
      {
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
        sort: { [sortBy]: descending ? -1 : 1 },
      }
    )
      .fetch()
      .map((activity) => {
        return {
          ...activity,
          residents: activity.residentIds
            .map((r) => residentFullNameMap[r])
            .join(', '),
          type: activityTypeMap[activity.activityTypeId],
        };
      });

    return {
      rows: activityWithNamesMapped,
      count: Activities.find(condtionForActivities).count(),
    };
  },

  aggregateActivitiesAndPopulateAggregateCollection,

  getResidentActvitiesWithActivityAndFaciltatorNameApi({ residentId }) {
    return Meteor.call("getResidentActvitiesWithActivityAndFaciltatorName", residentId);
  },

  /**
   * @memberof Activities
   * @name getResidentActvitiesWithActivityAndFaciltatorName
   * @description get resident activities with activity types and facilitator names
   *
   * @param {String} residentId
   * @returns {Array} list of activities
   */
  getResidentActvitiesWithActivityAndFaciltatorName(residentId) {
    const activityTypes = ActivityTypes.find().fetch();
    const facilitatorRoles = Meteor.roles
      .find({ name: { $ne: 'admin' } })
      .fetch();

    const activityTypesMap = activityTypes.reduce((map, activity) => {
      return { ...map, [activity._id]: activity.name };
    }, {});

    const facilitatorRolesMap = facilitatorRoles.reduce(
      (map, role) => {
        return { ...map, [role._id]: role.name };
      },
      {}
    );

    const residentActivities = Activities.find({
      residentIds: residentId,
    }).fetch();

    return residentActivities.map((activity) => {
      return {
        ...activity,
        activityTypeName: activityTypesMap[activity.activityTypeId],
        facilitatorRoleName:
          facilitatorRolesMap[activity.facilitatorRoleId],
      };
    });
  },

  getCountsByTypeApi({ residentId, type }) {
    return Meteor.call("getCountsByType", residentId, type);
  },

  /**
   * @memberof Activities
   * @name getCountsByType
   * @description count of activities grouped by type
   *
   * @param {*} residentId activity aggregate of the given resident
   * @param {*} type column of activity
   * @returns {Array} list with count of activity grouped by the given type
   */
  getCountsByType(residentId, type) {
    if (!type || !residentId) {
      throw new Meteor.Error(
        500,
        'Type and resident ids are required'
      );
    }

    try {
      const activities = Meteor.call(
        'getResidentActvitiesWithActivityAndFaciltatorName',
        residentId
      );
      const grouped = d3.groups(activities, function (activity) {
        return activity[type];
      });
      return grouped.map(function (activityType) {
        return {
          key: activityType[0],
          value: activityType[1].length,
        };
      });
    } catch (error) {
      throw new Meteor.Error(500, error.toString());
    }
  },

  getDaywiseActivityDurationApi({ residentId }) {
    return Meteor.call("getDaywiseActivityDuration", residentId)
  },

  /**
   * @memberof Activities
   * @name getDaywiseActivityDuration
   * @description for a given user get total time in minutes spend daily in each activity
   *
   * @param {String} residentId
   * @returns {Array} list containing dates and corresponding time spend in various activities
   */
  getDaywiseActivityDuration(residentId) {
    try {
      const activities = Meteor.call(
        'getResidentActvitiesWithActivityAndFaciltatorName',
        residentId
      );
      // Group activities by activity date
      const summedActivities = d3.groups(
        activities,
        (activity) => activity.activityDate
      );
      return summedActivities.map(function (activity) {
        return {
          timestamp: new Date(activity[0]).getTime(),
          duration: parseInt(d3.sum(activity[1], (a) => a.duration)),
        };
      });
    } catch (error) {
      throw new Meteor.Error(500, error.toString());
    }
  },

  saveActivity,
  removeActivity,
  getActivityById,
});

