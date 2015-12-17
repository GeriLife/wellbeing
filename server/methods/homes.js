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
  'getHomeActivities': function (homeId) {
    // Get all resident of this home
    var homeResidentIds = Meteor.call('getHomeResidentIds', homeId);

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
    // Get all resident IDs
    var residentIds = Meteor.call('getHomeResidentIds', homeId);

    // Placeholder for all resident activity sums by type
    var allResidentActivitySumsByType = [];

    // Iterate through all residents and get sum of resident recent activities by type
    residentIds.forEach(function (residentId) {
      // Get the sum of all activities by type for a given resident
       var residentActivitiesSumByType = Meteor.call('getSumOfAllResidentRecentActivitiesByType', residentId);

      // Add the resident activity sums to all resident activity sums array
      allResidentActivitySumsByType.push(residentActivitiesSumByType);
    });

    // Flatten the activities array
    allResidentActivitySumsByTypeFlattened = _.flatten(allResidentActivitySumsByType);

    return allResidentActivitySumsByTypeFlattened;
  },
  "getHomeActivityLevelCounts": function (homeId) {
    // // Get home residents by calling getHomeResidentIds
    var residentIds = Meteor.call("getHomeResidentIds",homeId);

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
    var residentIds = Meteor.call("getHomeResidentIds",homeId);


    var numberOfDays = 7;
    var activityCountsArray = [];

    for (var i = 0; i < numberOfDays; i++) {
      // Get today's date
      var day = moment().subtract(i, "days");

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
        var result = Meteor.call("getResidentWeeklyActivitiesCountFromDate", residentId, day);
        if (result === 0) {
          dailyActivityCounts.inactive =+ 1;
        } else if (result < 5) {
          dailyActivityCounts.semiActive += 1;
        } else if (result >= 5) {
          dailyActivityCounts.active += 1;
        };
      });

      // Add daily activity levels to activity counts array
      activityCountsArray.push(dailyActivityCounts);
    };

    console.log(activityCountsArray);
  }
});
