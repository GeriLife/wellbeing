/*
Methods returning data to render charts on the Home profile
*/

import d3 from 'd3';

Meteor.methods({
  getHomeResidentsActivitySumsByType ({ homeId, period }) {
    // Get all activity types
    const activityTypes = ActivityTypes.find({}, {sort: {name: 1}}).fetch();

    // Get all resident IDs
    const residentIds = Meteor.call('getHomeCurrentAndActiveResidentIds', homeId);

    // Placeholder for all resident activity sums by type
    return _.map(activityTypes, function (activityType) {
      // Create an object in the form of
      //  key: activityType.name
      //  values: [
      //    {
      //      "label": "Resident Name",
      //      "count": activity count (integer),
      //      "minutes": activity minutes (integer),
      //    },
      //    ...
      //  ]

      return {
        key: activityType.name,
        values: _.map(residentIds, function (residentId) {
          // Get resident
          const resident = Residents.findOne(residentId);

          // Get count of activities by current type for current resident
          const activityCount = Meteor.call("getCountOfResidentActivitiesByType", { residentId, activityTypeId: activityType._id, period });
          const activityMinutes = Meteor.call("getMinutesOfResidentActivitiesByType", { residentId, activityTypeId: activityType._id, period });

          // Placeholder object for resident name / activity count
          let residentActivityCount = {};

          if (activityCount > 0) {
            residentActivityCount = {
              "label": resident.fullName(),
              "count": activityCount,
              "minutes": activityMinutes,
            };
          } else {
            residentActivityCount = {
              "label": resident.fullName(),
              "count": 0,
              "minutes": activityMinutes,
            };
          }

          return residentActivityCount;
        })
      };
    });
  },
  getHomeActivitiesFacilitatorRoleMetrics({ homeId, period }) {
    // Get activities for current home (ID) from last Period
    let activityIds = Meteor.call(
      'getHomeCurrentResidentsActivityIds',
      { homeId, period }
    );

    // Set up query to get activities by ID
    const query = {
      _id: {
        $in: activityIds,
      },
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
    const facilitatorRoleCounts = d3.groups(activities, function (
      activity
    ) {
      return activity.facilitatorRoleName;
    });
    // Count the number & minutes of activities per facilitator role
    return facilitatorRoleCounts.map(function (facilitatorRole) {
      return {
        key: facilitatorRole[0],
        value: {
          count: facilitatorRole[1].length,
          minutes: d3.sum(facilitatorRole[1], function (activity) {
            return parseFloat(activity.duration);
          }),
        },
      };
    });
  },
  getHomeActivityTypeMetrics ({ homeId, period }) {
    // Get activities for current home (ID) from last period
    let activityIds = Meteor.call('getHomeCurrentResidentsActivityIds', { homeId, period });

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
    const groupedData = d3.groups(activities, function (activity) {
      return activity.activityTypeName;
    });
    // Count the number & minutes of activities per facilitator role
    return groupedData.map(function (dailyActivities) {
      return {
        key: dailyActivities[0],
        value: {
          count: dailyActivities[1].length,
          minutes: d3.sum(dailyActivities[1], function (activity) {
            return parseFloat(activity.duration);
          }),
        },
      };
    });
  }
});
