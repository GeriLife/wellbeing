/*
Methods returning data to render charts on the Home profile
*/

import d3 from 'd3';

Meteor.methods({
  'getHomeResidentsActivitySumsByTypeLast30Days': function (homeId) {
    // Get all activity types
    var activityTypes = ActivityTypes.find({}, {sort: {name: 1}}).fetch();

    // Get all resident IDs
    const residentIds = Meteor.call('getHomeCurrentAndActiveResidentIds', homeId);

    // Placeholder for all resident activity sums by type
    var allResidentActivitySumsByType = _.map(activityTypes, function (activityType) {
      // Create an object in the form of
      //  key: actiivtyType.name
      //  values: [
      //    {
      //      "label": "Resident Name",
      //      "value": activity count (integer)
      //    },
      //    ...
      //  ]

      var residentActivityCountsByCurrentType = {
        key: activityType.name,
        values: _.map(residentIds, function (residentId) {
          // Get resident
          var resident = Residents.findOne(residentId);

          // Get count of activities by current type for current resident
          var activityCount = Meteor.call("getSumOfResidentActivitiesByTypeLast30Days", residentId, activityType._id);

          // Placeholder object for resident name / activity count
          var residentActivityCount = {};

          if (activityCount > 0) {
            residentActivityCount = {
              "label": resident.fullName(),
              "value": activityCount
            };
          } else {
            residentActivityCount = {
              "label": resident.fullName(),
              "value": 0
            };
          }

          return residentActivityCount;
        })
      }

      return residentActivityCountsByCurrentType;
    });

    return allResidentActivitySumsByType;
  },
///
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
