import moment from 'moment';

Meteor.methods({
  getAllResidentIds () {
    // TODO: determine how to secure this method to prevent client abuse

    // Get all residents
    const residents = Residents.find().fetch();

    // Create an array of resident IDs
    const residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    return residentIds;
  },
  getResidentActivitiesByTypeLast30Days (residentId, activityTypeId) {
    // Date thirty days ago
    const thirtyDaysAgo = moment().subtract(30, "days").toDate();

    // Date today
    const now = new Date();

    // Get all activities of a specific type involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    const activities = Activities.find({
      'residentIds': residentId,
      'activityTypeId': activityTypeId,
      activityDate: {$gte: thirtyDaysAgo, $lte: now}},
      {sort : {activityDate:  -1}
    }).fetch();

    if (activities) {
      return activities;
    }
  },
  getSumOfResidentActivitiesByTypeLast30Days (residentId, activityTypeId) {
    var activities = Meteor.call('getResidentActivitiesByTypeLast30Days', residentId, activityTypeId);

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
  getSumOfAllResidentRecentActivitiesByType (residentId) {
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

    return activityCount;
  },
  getAllResidentSelectOptions () {
    /*
    return an array of resident objects in the form of:
       label: firstName lastInitial
       value: residentId
   */

   // Get all residents
   const residents = Residents.find().fetch();

   // Create array of resident select options
   const residentSelectOptions = _.map(residents, (resident) => {
     return {
       label: `${resident.firstName} ${resident.lastInitial}`,
       value: resident._id,
     }
   });

   return residentSelectOptions;
  },
});
