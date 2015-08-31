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
    var residentIds = Meteor.call('getHomeResidentIds');

    // Placeholder for all resident activity sums by type
    var allResidentActivitySumsByType = [];

    // Iterate through all residents and get sum of resident recent activities by type
    residentIds.forEach(function (residentId) {
      // Get the sum of all activities by type for a given resident
       var residentActivitiesSumByType = Meteor.call('getSumOfAllResidentRecentActivitiesByType', residentId);

      // Add the resident activity sums to all resident activity sums array
      allResidentActivitySumsByType.push(residentActivitiesSumByType);
    });

    allResidentActivitySumsByTypeFlattened = _.flatten(allResidentActivitySumsByType)

    return allResidentActivitySumsByTypeFlattened;
  }
});
