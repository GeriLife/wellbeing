/*
Methods returning data to render charts on the Home profile
*/

import d3 from 'd3';
import moment from 'moment';

Meteor.methods({
  'getHomeResidentsActivitySumsByType': function ({homeId, activityMetric, activityPeriod}) {
    /*
    homeId - id for home
    activityMetric - either 'count' or 'minutes'
    activityPeriod - number of days prior to current date
    */

    const activityPeriodStart = moment().subtract(activityPeriod, 'days').toDate();

    // Get all home Residencies
    const residenciesQuery = {
      "$and": [
        { homeId },
        {
          "$or": [
            {
              "moveOut": {
                // haven't moved out
                "$exists": false
              }
            },
            {
              "moveOut": {
                // moved out after activity period start
                "$gte": activityPeriodStart
              }
            }
          ]
        }
      ],
    };

    const residencies = Residencies.find(residenciesQuery).fetch();

    // get resident IDs
    const residentIds = _.map(residencies, function (residency) {
      return residency.residentId;
    });

    // find activities within activity period
    // where one of activity.residentIds is in residentIds
    const activitiesQuery = {
      activityDate: {
        $gte: activityPeriodStart,
      },
      residentIds: {
        $in: residentIds,
      }
    }

    // get activities for residents (by ID) where activityDate gte activityPeriod
    const activities = Activities.find(activitiesQuery).fetch();

    // annotate activities with name and facilitator role
    const annotatedActivities = Meteor.call('annotateActivities', activities);

    // aggregate activities into daily bins grouped by type
    //  - activity count
    //  - activity minutes
    var nestedActivities = d3.nest()
      .key(function(activity) { return activity.activityTypeName })
      .rollup(function(groupedActivities) {
         return {
           "activity_count": groupedActivities.length,
           "activity_minutes": d3.sum(groupedActivities, function(activity) {
             return parseFloat(activity.duration);
           })
         }
       })
      .entries(annotatedActivities);

     return nestedActivities;
  },
  getHomeActivitiesFacilitatorRolesCountsLast30days (homeId) {
    // Get activties for current home (ID) from last 30 days
    let activityIds = Meteor.call('getHomeCurrentResidentsActivityIdsLast30Days', homeId);

    // Set up query to get activities by ID
    const query = {
      _id: {
        $in: activityIds
      }
    };

    // Get activities
    let activities = Activities.find(query).fetch();

    // Add 'facilitatorRoleName' field to each activity,
    // Containing Role name in plain text
    activities = _.map(activities, function (activity) {
      // Get activity type name via collection helper
      activity.facilitatorRoleName = activity.facilitatorRole();

      return activity;
    });

    // Group activities by facilitator role
    const facilitatorRoleCounts = d3.nest()
      .key(function (activity) {
        return activity.facilitatorRoleName;
      })
      // Count the number of activies per facilitator role
      .rollup(function (facilitatorRole) { return facilitatorRole.length })
      .entries(activities);

    return facilitatorRoleCounts;
  },
///
  getHomeActivityTypeCountsLast30days (homeId) {
    // Get activties for current home (ID) from last 30 days
    let activityIds = Meteor.call('getHomeCurrentResidentsActivityIdsLast30Days', homeId);

    // Set up query to get activities by ID
    const query = {
      _id: {
        $in: activityIds
      }
    };

    // Get activities
    let activities = Activities.find(query).fetch();

    // Add 'activityTypeName' field to each activity,
    // Containing Activity Type name in plain text
    activities = _.map(activities, function (activity) {
      // Get activity type name via collection helper
      activity.activityTypeName = activity.activityType();

      return activity;
    });

    // Group activities by facilitator role
    const activityTypeCounts = d3.nest()
      .key(function (activity) {
        return activity.activityTypeName;
      })
      // Count the number of activies per facilitator role
      .rollup(function (activityTypeName) { return activityTypeName.length })
      .entries(activities);

    return activityTypeCounts;
  }
});
