Meteor.publishComposite('latestActivitiesComposite', {
  find: function () {
    // Get latest activity IDs
    var latestActivityIds = Meteor.call('getAllResidentsLatestActivityIdsByType');

    // Get cursor to latest activities
    return Activities.find({_id: {$in: latestActivityIds}});
  },
  children: [
    {
      find: function (activity) {
        return ActivityTypes.find({'_id': activity.activityTypeId});
      }
    },
    {
      find: function (activity) {
        return Residents.find({'_id': {$in: activity.residentIds}});
      },
      children: [
        {
          find: function (resident) {
            return Homes.find({'_id': resident.homeId});
          }
        }
      ]
    }
  ]
});
