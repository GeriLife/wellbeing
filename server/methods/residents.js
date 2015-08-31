Meteor.methods({
  'getAllResidentIds': function () {
    // TODO: determine how to secure this method to prevent client abuse

    // Get all residents
    var residents = Residents.find().fetch();

    // Create an array of resident IDs
    var residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    return residentIds;
  },
  'getResidentsNameHomeAndLatestActivityByType': function (activityTypeId) {
    // Get all resident IDs
    var residentIds = Meteor.call('getAllResidentIds');

    // Placeholder for residents latest activity
    var residentsLatestActivityByType = [];

    // Loop through all resident IDs
    residentIds.forEach(function (residentId) {
      // Return resident latest activity
      var residentLatestActivity = Meteor.call('getResidentLatestActivityByType', residentId, activityTypeId);

      // If resident activity exists
      if (residentLatestActivity !== undefined) {
        // Get resident from collection
        var resident = Residents.findOne(residentId);

        // Construct an object with resident name and last activity date
        var residentActivityObject = {
          residentName: resident.fullName(),
          homeName: resident.homeName(),
          activityDate: residentLatestActivity.activityDate
        };

        // Add resident latest activity to residents latest activity array
        residentsLatestActivityByType.push(residentActivityObject);
      }
    });

    return residentsLatestActivityByType;
  },
  'getResidentsWithoutActivityByType': function (activityTypeId) {
    // // Get resident latest activity by type
    // var residentLastActivityByType = Meteor.call('getResidentsLatestActivityByType', activityTypeId);
    //
    // // Get all resident IDs
    // var residentIds = Residents.find({}, {fields: {_id: 1}}).fetch();
    //
    // // Get residents who have participated in the activity type
    // var residentsWithPreviousActivity = _.map(residentLastActivityByType, function (resident) {
    //   return resident._id;
    // });
    //
    // // Get residents who have not participated in activity type
    // var residentsWithoutPreviousActivity = _.difference(residentIds, residentsWithPreviousActivity);
    //
    // return residentsWithoutPreviousActivity;
  },
  'getResidentRecentActivities': function (residentId) {
    // Date two weeks ago
    var twoWeeksAgo = moment().subtract(2, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({'residentIds': residentId, activityDate: {$gte: twoWeeksAgo, $lte: now}}, {sort : {activityDate:  -1} });
  },
  'getResidentRecentActivitiesByType': function (residentId, activityTypeId) {
    // Date two weeks ago
    var twoWeeksAgo = moment().subtract(2, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities of a specific type involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({
      'residentIds': residentId,
      'activityTypeId': activityTypeId,
      activityDate: {$gte: twoWeeksAgo, $lte: now}},
      {sort : {activityDate:  -1}
    });
  },
  'getSumOfResidentRecentActivitiesByType': function (residentId, activityTypeId) {
    var activities = Meteor.call('getResidentRecentActivitiesByType', residentId, activityTypeId);
    // Placeholder for sum of activities
    var sumOfActivities = 0;

    // Count each activity
    activites.forEach(function (activity) {
      // Count the resident activity
      sumOfActivites += 1;
    });

    return sumOfACtivities;
  },
  'getSumOfAllResidentRecentActivitiesByType': function (residentId) {
    // Get all activity type IDs
    var activityTypeIds = Meteor.call('getAllActivityTypeIds');

    // Placeholder for resident activity sums
    var residentActivitySumsByType = [];

    activityTypeIds.forEach(function (activityTypeId) {
      // Get the activity type
      var activityType = ActivityTypes.find(activityTypeId).fetch();

      // Get sum of activity type
      var activitySum = Meteor.call('getSumOfResidentRecentActivitiesByType', residentId, activityTypeId);

      // Create an object with the activity type name and sum
      var activityTypeSum = {
        name: activityType.name,
        sum: activitySum
      }

      // Add the resident activity type sum to the resident activity sums array
      residentActivitySumsByType.push(activityTypeSum);
    });

    return residentActivitySumsByType;
  },
  'getAllResidentsActivitySumsByType': function () {
    // Get all resident IDs
    var residentIds = Meteor.call('getAllResidentIds');

    // Placeholder for all resident activity sums by type
    var allResidentActivitySumsByType = [];

    // Iterate through all residents and get sum of resident recent activities by type
    residentIds.forEach(function (residentId) {
      var residentActivitiesSumByType = Meteor.call('getSumOfAllResidentRecentActivitiesByType', residentId);

      // Add the resident activity sums to all resident activity sums array
      allResidentActivitySumsByType.push(residentActivitiesSumByType);
    });

    console.log(allResidentActivitySumsByType);

    return allResidentActivitySumsByType;
  }
});
