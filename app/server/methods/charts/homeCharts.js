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
    
    // Get all home Residencies
    const query = {
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
                "$gte": moment().subtract(activityPeriod, 'days').toDate()
              }
            }
          ]
        }
      ],
    };
    console.log(query)
    const residencies = Residencies.find(query).fetch();
    return residencies
    // get resident IDs

    // get activities for residents (by ID) where activityDate gte activityPeriod
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
