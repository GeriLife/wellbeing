Meteor.publishComposite('activitiesComposite', {
  find: function () {
    return Activities.find();
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
