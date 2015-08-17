Meteor.methods({
  'getResidentsLatestActivityByType': function (activityTypeId) {
    // Get resident latest activity by type
    var residentLastActivityByType = Activities.aggregate([
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
          activities: {$push: '$activityDate'}
        }
      }
    ]);

    return residentLastActivityByType;
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
