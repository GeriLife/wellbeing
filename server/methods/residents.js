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
  'getResidentLatestActivityByType': function (residentId, activityTypeId) {
    var query = {
      activityTypeId: activityTypeId,
      residentIds: residentId
    };

    var sort = {sort: {activityDate: -1}};

    // Get resident latest activity by type
    var residentLatestActivityByType = Activities.findOne(query,sort);

    // Return activity, if exists
    if (residentLatestActivityByType) {
      return residentLatestActivityByType;
    }
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
          latestActivityDate: residentLatestActivity.activityDate
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
  }
});
