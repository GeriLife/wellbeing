import _ from 'lodash';
import d3 from 'd3';
import moment from 'moment';
import { isCurrentUserAdmin } from '../utils/user';

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

function aggregateActivitiesAndPopulateAggregateCollection() {
  /* Get monthly data */
  Meteor.call('getAllHomeReportAggregates', function(error, data) {
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
    AllHomesActivityReportAggregate.insert(activityTypeData, function(
      error
    ) {
      if (error) console.error('activityTypeData: ', error);
    });

    AllHomesActivityReportAggregate.insert(facilitatorData, function(
      error
    ) {
      if (error) console.error('facilitatorData: ', error);
    });
  });
}

function saveActivity(formData) {
  const currentUserIsAdmin = Roles.userIsInRole(
    Meteor.userId(),
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

function removeActivity(activityId) {
  if (!isCurrentUserAdmin()) {
    throw new Meteor.Error(500, 'Operation not allowed');
  }

  return Activities.remove(activityId);
}

export default Meteor.methods({
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
    return _.map(activities, function(activity) {
      const activityTypeId = activity.activityTypeId;
      const facilitatorRoleId = activity.facilitatorRoleId;

      activity['activityTypeName'] =
        activityTypesDict[activityTypeId];
      activity['facilitatorName'] =
        facilitatorDict[facilitatorRoleId];

      return activity;
    });
  },
  aggregateActivities(
    annotatedActivities,
    timePeriod,
    aggregateBy = 'activityTypeName'
  ) {
    // aggregate activities into daily bins grouped by type
    //  - activity count
    //  - activity minutes
    return d3
      .nest()
      .key(function(activity) {
        return activity[aggregateBy];
      })
      .key(function(activity) {
        return moment(activity.activityDate)
          .startOf(timePeriod)
          .toDate();
      })
      .rollup(function(dailyActivities) {
        return {
          activity_count: dailyActivities.length,
          activity_minutes: d3.sum(dailyActivities, function(
            activity
          ) {
            return parseFloat(activity.duration);
          }),
        };
      })
      .entries(annotatedActivities);
  },
  getAllHomeReportAggregates,
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
    return d3
      .nest()
      .key(function(activity) {
        return activity.activityTypeName;
      })
      .key(function(activity) {
        return moment(activity.activityDate)
          .startOf('day')
          .toDate();
      })
      .rollup(function(dailyActivities) {
        return {
          activity_count: dailyActivities.length,
          activity_minutes: d3.sum(dailyActivities, function(
            activity
          ) {
            return parseFloat(activity.duration);
          }),
        };
      })
      .entries(annotatedActivities);
  },
  getAggregatedActivities(timePeriod, aggregateBy) {
    const activities = Activities.find().fetch();

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
      timePeriod,
      aggregateBy
    );
  },
  getActivitiesAggregateReport(timePeriod, aggregateBy) {
    if (!aggregateBy)
      throw new Meteor.Error('Required aggregateBy field');

    /* Key to selected based on time period */
    const fieldSelector =
      timePeriod === 'week' ? 'weeklyData' : 'monthlyData';

    /* Pick an entry with the latest date */
    const data = AllHomesActivityReportAggregate.findOne(
      { aggregateBy },
      { fields: { [fieldSelector]: 1, lastUpdatedDate: 1, _id: 0 } },
      { sort: { Date: -1, limit: 1 } }
    );

    return {
      activityData: data ? data[fieldSelector] : [],
      lastUpdated: data ? data.lastUpdatedDate : null,
    };
  },
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
  getMonthlyAggregatedHomeResidentActivities: function(
    homeId,
    timePeriod
  ) {
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

    const nestedActivities = Meteor.call(
      'aggregateActivities',
      annotatedActivities,
      timePeriod
    );

    return nestedActivities;
  },
  getAllHomeResidentActivities(homeId) {
    // Get all home Residencies
    const query = {
      homeId,
    };

    const homeResidencies = Residencies.find(query).fetch();

    // get activities for each resident during residency period
    const homeResidentsActivities = _.flatMap(
      homeResidencies,
      function(residency) {
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
  getResidentLatestActivityIdByType: function(
    residentId,
    activityTypeId
  ) {
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
  getAllResidentsLatestActivityIdsByType: function(activityTypeId) {
    // Get all resident IDs
    var residentIds = Meteor.call('getAllResidentIds');

    // Placeholder for residents latest activity IDs
    var residentsLatestActivityIdsByType = [];

    // Loop through all resident IDs
    residentIds.forEach(function(residentId) {
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
  getHomeCurrentResidentsActivityIds({ homeId, period }) {
    /*
    Get all activities in past period
    for residents of a given home (provided by home ID)
    */

    // Get date period days ago (converting to JavaScript date)
    const previousDate = moment()
      .subtract(period, 'days')
      .toDate();

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

    // Get activties documents cursor
    const activities = Activities.find(query).fetch();

    // Create an array of activity IDs
    return _.map(activities, function(activity) {
      return activity._id;
    });
  },
  getLatestActivityIds: function() {
    // Get all activity type IDs
    var activityTypeIds = Meteor.call('getAllActivityTypeIds');

    // Placeholder array for latest activity IDs
    var latestActivityIds = [];

    // Go through all activity types
    activityTypeIds.forEach(function(activityTypeId) {
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
  getActivityCountByActivityTypeId(activityTypeId) {
    // Get count of activities by activity type ID
    return Activities.find({ activityTypeId }).count();
  },
  'allUserVisibleActivities-paginated'({
    currentPage,
    rowsPerPage,
    activityTypeId,
    residentId,
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
    return {
      rows: Activities.find(condtionForActivities, {
        skip: (currentPage - 1) * rowsPerPage,
        limit: rowsPerPage,
      }).fetch(),
      count: Activities.find(condtionForActivities).count(),
    };
  },
  aggregateActivitiesAndPopulateAggregateCollection,

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

    return residentActivities.map(activity => {
      return {
        ...activity,
        activityTypeName: activityTypesMap[activity.activityTypeId],
        facilitatorRoleName:
          facilitatorRolesMap[activity.facilitatorRoleId],
      };
    });
  },

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
      return d3
        .nest()
        .key(function(activity) {
          return activity[type];
        })
        .rollup(function(activityType) {
          return activityType.length;
        })
        .entries(activities);
    } catch (error) {
      throw new Meteor.Error(500, error.toString());
    }
  },

  getDaywiseActivityDuration(residentId) {
    try {
      const activities = Meteor.call(
        'getResidentActvitiesWithActivityAndFaciltatorName',
        residentId
      );
      // Group activities by activity date
      const summedActivities = d3
        .nest()
        .key(activity => activity.activityDate)
        .rollup(function(activity) {
          return {
            duration: d3.sum(activity, activity => activity.duration),
          };
        })
        .entries(activities);

      return summedActivities.map(function(activity) {
        return {
          timestamp: new Date(activity.key).getTime(),
          duration: parseInt(activity.value.duration),
        };
      });
    } catch (error) {
      return Meteor.Error(500, error.toString());
    }
  },

  saveActivity,
  removeActivity,
});

