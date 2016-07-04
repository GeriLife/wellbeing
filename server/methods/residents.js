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
  'getCurrentResidentIds': function () {
    // TODO: determine how to secure this method to prevent client abuse

    // Get all residents
    var residents = Residents.find({departed: false}).fetch();

    // Create an array of resident IDs
    var residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    return residentIds;
  },
  'getResidentsNameHomeAndLatestActivityByType': function (activityTypeId) {
    // Get all resident IDs
    var residentIds = Meteor.call('getCurrentAllResidentIds');

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
  'getResidentRecentActivitiesCount': function (residentId) {
    // Date two weeks ago
    var twoWeeksAgo = moment().subtract(2, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({'residentIds': residentId, activityDate: {$gte: twoWeeksAgo, $lte: now}}).count();
  },
  'getResidentRecentActivitiesByType': function (residentId, activityTypeId) {
    // Date two weeks ago
    var twoWeeksAgo = moment().subtract(4, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities of a specific type involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    var activities = Activities.find({
      'residentIds': residentId,
      'activityTypeId': activityTypeId,
      activityDate: {$gte: twoWeeksAgo, $lte: now}},
      {sort : {activityDate:  -1}
    }).fetch();

    if (activities) {
      return activities;
    };
  },
  'getSumOfResidentRecentActivitiesByType': function (residentId, activityTypeId) {
    var activities = Meteor.call('getResidentRecentActivitiesByType', residentId, activityTypeId);

    // Placeholder for sum of activities
    var sumOfActivities = 0;

    if (activities) {
      // Count each activity
      activities.forEach(function (activity) {
        // Count the resident activity
        sumOfActivities += 1;
      });
    };

    return sumOfActivities;
  },
  'getSumOfAllResidentRecentActivitiesByType': function (residentId) {
    // Get all activity type IDs
    var activityTypeIds = Meteor.call('getAllActivityTypeIds');

    // Placeholder for resident activity sums
    var residentActivitySumsByType = [];

    activityTypeIds.forEach(function (activityTypeId) {
      // Get the activity type
      var activityType = ActivityTypes.findOne(activityTypeId);

      // Get the resident
      var resident = Residents.findOne(residentId);

      // Get sum of activity type for the current resident
      var activitySum = Meteor.call('getSumOfResidentRecentActivitiesByType', residentId, activityTypeId);

      // Create an object with the activity type name and sum
      var activityTypeSum = {
        residentName: resident.fullName(),
        activityTypeName: activityType.name,
        sum: activitySum
      }

      // Add the resident activity type sum to the resident activity sums array
      residentActivitySumsByType.push(activityTypeSum);
    });

    return residentActivitySumsByType;
  },
  'getAllResidentsActivitySumsByType': function () {
    // Get all resident IDs
    var residentIds = Meteor.call('getCurrentResidentIds');

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
