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
  }
});
