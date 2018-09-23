import _ from 'lodash';
import moment from 'moment';

Meteor.methods({
  annotateActivities (activities) {
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

    const activityTypesDict = _(activityTypes)
                                            .keyBy('_id')
                                            .mapValues('name')
                                            .value();

    // map over activity objects
    // add attributes to each
    //  - activityTypeName
    //  - facilitatorRoleName
    const annotatedActivities = _.map(activities, function (activity) {
      const activityTypeId = activity.activityTypeId;
      const facilitatorRoleId = activity.facilitatorRoleId;

      activity['activityTypeName'] = activityTypesDict[activityTypeId];

      return activity;
    });

    return annotatedActivities;
  },
  'getAllHomeResidentActivities' (homeId) {
    // Get all home Residencies
    const query = {
      homeId,
    };

    const homeResidencies = Residencies.find(query).fetch();

    // get activities for each resident during residency period
    const homeResidentActivities = _.flatMap(homeResidencies, function (residency) {
      let homeActivitiesQuery = {
        residentIds: residency.residentId,
        activityDate: {
          $gte: residency.moveIn
        }
      };

      // Check if residency has move out date
      if (residency.hasOwnProperty('moveOut')) {
        // set query to be before residency move out
        homeActivitiesQuery.activityDate['$lte'] = residency.moveOut;
      }

      const homeResidentActivities = Activities.find(homeActivitiesQuery).fetch();

      return homeResidentActivities;
    });

    return homeResidentActivities;
  },
  'getResidentLatestActivityIdByType': function (residentId, activityTypeId) {
    /*
    Get the resident's most recent activity by type
    */
    var query = {
      activityTypeId: activityTypeId,
      residentIds: residentId
    };
    // Set up sort by activity date, in descending order
    var sort = {sort: {activityDate: -1}};

    // Get resident latest activity by type
    var residentLatestActivityByType = Activities.findOne(query, sort);

    // Return activity, if exists
    if (residentLatestActivityByType) {
      return residentLatestActivityByType._id;
    }
  },
  'getAllResidentsLatestActivityIdsByType': function (activityTypeId) {
    // Get all resident IDs
    var residentIds = Meteor.call('getAllResidentIds');

    // Placeholder for residents latest activity IDs
    var residentsLatestActivityIdsByType = [];

    // Loop through all resident IDs
    residentIds.forEach(function (residentId) {
      // Return resident latest activity
      var residentLatestActivityId = Meteor.call('getResidentLatestActivityIdByType', residentId, activityTypeId);
      // If resident activity exists
      if (residentLatestActivityId !== undefined) {
        // Add resident latest activity ID to residents latest activity IDs array
        residentsLatestActivityIdsByType.push(residentLatestActivityId);
      }
    });

    if (residentsLatestActivityIdsByType) {
      // Return the array
      return residentsLatestActivityIdsByType;
    }
  },
  'getHomeCurrentResidentsActivityIdsLast30Days' (homeId) {
    /*
    Get all activities in past 30 days
    for residents of a given home (provided by home ID)
    */


    // Get date 30 days ago (converting to JavaScript date)
    const previousDate = moment().subtract(30, 'days').toDate();

    // Get current resident IDs for given home
    const residentIds = Meteor.call('getHomeCurrentAndActiveResidentIds', homeId);

    // Set up MongoDB query object
    // activities where one or more activity.residentIds matched in residentIds
      // (searching array field with array of values)
    // and activityDate greater than or equal to 'previousDate' (30 days ago)
    const query = {
      residentIds: {
        $elemMatch: {
          $in: residentIds
        }
      },
      activityDate: {
        $gte: previousDate
      }
    };

    // Get activties documents cursor
    const activities = Activities.find(query).fetch();

    // Create an array of activity IDs
    const activityIds = _.map(activities, function (activity) {
      return activity._id;
    });

    return activityIds;
  },
  'getLatestActivityIds': function () {
    // Get all activity type IDs
    var activityTypeIds = Meteor.call('getAllActivityTypeIds');

    // Placeholder array for latest activity IDs
    var latestActivityIds = [];

    // Go through all activity types
    activityTypeIds.forEach(function (activityTypeId) {
      // Get latest activities for activity type
      var latestActivityIdsByType = Meteor.call('getAllResidentsLatestActivityIdsByType', activityTypeId);

      // Add latest activity IDs to array
      latestActivityIds.push(latestActivityIdsByType);
    });

    // Flatten the latestActivityIds array
    var latestActivityIdsFlat = _.flatten(latestActivityIds);

    return latestActivityIdsFlat;
  },
  getActivityCountByActivityTypeId (activityTypeId) {
    // Get count of activities by activity type ID
    const activityCount = Activities.find({ activityTypeId }).count();

    return activityCount;
  }
});
