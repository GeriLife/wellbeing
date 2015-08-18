Meteor.methods({
  'getResidentsLatestActivityByType': function (activityTypeId) {
    // Get resident latest activity by type
    var residentLatestActivityByType = Activities.aggregate([
      {$match:
        {activityTypeId: 'ccuz85YWbfAx4Yg7B'}
      },
      {$sort:
        {activityDate: -1}
      },
      {$unwind: '$residentIds'},
      {$group:
        {
          _id: "$residentIds",
          latestActivity: {$first: '$activityDate'}
        }
      }
    ]);

    return residentLatestActivityByType;
  },
  'getResidentsNameHomeAndLatestActivityByType': function (activityTypeId) {
    // Get resident latest activity by type
    var residentLatestActivityByType = Meteor.call('getResidentsLatestActivityByType', activityTypeId);

    // Set up array of residents with name, home, and activity fields
    var residentNamesWithLatestActivity = _.map(residentLatestActivityByType, function (residentLatestActivity) {
      // Get the resident ID
      var residentId = residentLatestActivity._id;

      // Get resident from collection
      var resident = Residents.findOne(residentId);

      // Construct object containing resident name, home name, and last activity date
      var residentNameAndLatestActivity = {
        residentName: resident.fullName(),
        homeName: resident.homeName(),
        lastActivityDate: residentLatestActivity.latestActivity
      };

      return residentNameAndLatestActivity;
    });

    return residentNamesWithLatestActivity;
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
