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
    // // Create placeholder array for resident names with latest activity
    // var residentNamesWithLatestActivity = [];
    //
    // // Get resident latest activity by type
    // var latestActivities = Meteor.call('getResidentsLatestActivityByType', activityTypeId);
    //
    // // Set up array of residents with name, home, and activity fields
    // var residentNamesWithLatestActivity = _.map(latestActivities, function (latestActivity) {
    //   // Get the resident ID
    //   var residentId = latestActivity._id;
    //
    //   // Get resident from collection
    //   var resident = Residents.findOne(residentId);
    //
    //   // Construct object containing resident name, home name, and last activity date
    //   var residentNameAndLatestActivity = {
    //     residentName: resident.fullName(),
    //     homeName: resident.homeName(),
    //     lastActivityDate: latestActivity.activityDate
    //   };
    //
    //   return residentNameAndLatestActivity;
    // });

    var residentIds = Meteor.call('getAllResidentIds');

    residentIds.forEach(function (residentId) {
      Meteor.call('getResidentLatestActivityByType', residentId, activityTypeId);
    });

    return [
      {name: 'First Resident', home: 'Home Name'},
      {name: 'Second Resident', home: 'Home Name'},
    ];
  },
  'getResidentsWithoutActivityByType': function (activityTypeId) {
    // Get resident latest activity by type
    var residentLastActivityByType = Meteor.call('getResidentsLatestActivityByType', activityTypeId);

    // Get all resident IDs
    var residentIds = Residents.find({}, {fields: {_id: 1}}).fetch();

    // Get residents who have participated in the activity type
    var residentsWithPreviousActivity = _.map(residentLastActivityByType, function (resident) {
      return resident._id;
    });

    // Get residents who have not participated in activity type
    var residentsWithoutPreviousActivity = _.difference(residentIds, residentsWithPreviousActivity);

    return residentsWithoutPreviousActivity;
  }
});
