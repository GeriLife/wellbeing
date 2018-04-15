Meteor.publishComposite('residentProfileComposite', function (residentId) {
  return {
    find: function () {
      return Residents.find(residentId);
    },
    children: [
      {
        find: function (resident) {
          // Get resident Activities
          return Activities.find({residentIds: resident._id});
        },
        children: [
          {
            // Get Activity Type
            find: function (activity) {
              return ActivityTypes.find(activity.activityTypeId);
            }
          }
        ]
      },
    ]
  }
});
