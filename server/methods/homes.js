Meteor.methods({
  'getHomeResidentIds': function (homeId) {
    // Get all residents of specific home
    var residents = Residents.find({'homeId': homeId}).fetch();

    // Create an array containing only resident IDs
    var residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    // return the resident IDs array
    return residentIds;
  },
  'getHomeCurrentResidentIds': function (homeId) {
    // Get all residents of specific home
    var residents = Residents.find({'homeId': homeId, departed: false}, {sort: {firstName: 1}}).fetch();

    // Create an array containing only resident IDs
    var residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    // return the resident IDs array
    return residentIds;
  },
  'getHomeCurrentResidentCount': function (homeId) {
    // Get all current residents for specific home
    const homeCurrentResidentIds = Meteor.call("getHomeCurrentResidentIds", homeId);

    // Count the length of current resident IDs list
    const homeCurrentResidentsCount = homeCurrentResidentIds.length;

    return homeCurrentResidentsCount;
  },
  'getHomeActivities': function (homeId) {
    // Get all resident of this home
    var homeResidentIds = Meteor.call('getHomeCurrentResidentIds', homeId);

    // Get an array of all activity Ids for residents of this home
    var homeResidentActivitiesQuery = Activities.find(
      {'residentIds': {$elemMatch: {$in: homeResidentIds}}},
      {sort: {activityDate: -1}}
    );

    // return all activities from activity IDs array
    var homeActivities = homeResidentActivitiesQuery.fetch();

    // Create a custom activities array using collection helpers
    // for resident names, activity type, and time ago
    var homeActivitiesArray = homeActivities.map(function (activity) {
      return {
        residents: activity.residentNames(),
        type: activity.activityType(),
        duration: activity.duration,
        activityDate: activity.activityDate
      }
    });

    return homeActivitiesArray;
  },
  'getHomeResidentsActivitySumsByType': function (homeId) {
    // Get all activity types
    var activityTypes = ActivityTypes.find({}, {sort: {name: 1}}).fetch();

    // Get all resident IDs
    var residentIds = Meteor.call('getHomeCurrentResidentIds', homeId);

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
          var activityCount = Meteor.call("getSumOfResidentRecentActivitiesByType", residentId, activityType._id);

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
  "getHomeActivityLevelCounts": function (homeId) {
    // // Get home residents by calling getHomeResidentIds
    var residentIds = Meteor.call("getHomeCurrentResidentIds",homeId);

    var residentActivityLevelCounts = {
      inactive: 0,
      semiActive: 0,
      active: 0
    };

    if (residentIds){
      // Get activity level for each resident via getResidentRecentActivitiesCount
      _.each(residentIds, function (residentId) {
        var residentActivityCount = Meteor.call(
          "getResidentRecentActivitiesCount",
          residentId
        );

        // Check resident activity level
        if (residentActivityCount === 0) {
          // If zero activities, resident is inactive
          residentActivityLevelCounts.inactive += 1;
        } else if (residentActivityCount < 5) {
          // If less than five activities, resident is semi-active
          // TODO: refactor to use activity threshold variable
          residentActivityLevelCounts.semiActive += 1;
        } else if (residentActivityCount >= 5) {
          // If greater than or equal to five activities, resident is active
          // TODO: refactor to use activity threshold variable
          residentActivityLevelCounts.active += 1;
        }
      });
    }

    return residentActivityLevelCounts;
  },
  "getHomeActivityCountTrend": function (homeId) {
    // Get home residents
    var residentIds = Meteor.call("getHomeCurrentResidentIds",homeId);

    // Number of days to look back
    var numberOfDays = 7;

    // Placeholder array for daily activity level counts
    var activityCountsArray = [];

    for (var i = 0; i < numberOfDays; i++) {
      // Get date N days ago for daily activity counts and query
      var day = moment().startOf("day").subtract(i, "days");
      var queryDate = moment().endOf("day").subtract(i, "days");

      // Set up placeholder activity counts object
      var dailyActivityCounts = {
        date: day.toDate(),
        inactive: 0,
        semiActive: 0,
        active: 0
      };

      // Get activity level for each resident
      // Compare it against the baseline
      _.each(residentIds, function (residentId) {
        var result = Meteor.call(
          "getResidentWeeklyActivitiesCountFromDate",
          residentId,
          queryDate.toDate()
        );

        if (result === 0) {
          dailyActivityCounts.inactive += 1;
        } else if (result < 5 && result > 0) {
          dailyActivityCounts.semiActive += 1;
        } else if (result >= 5) {
          dailyActivityCounts.active += 1;
        };
      });

      // Add daily activity levels to activity counts array
      activityCountsArray.push(dailyActivityCounts);
    };

    return activityCountsArray;
  }
});
