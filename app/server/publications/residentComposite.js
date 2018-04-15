Meteor.publishComposite('residentProfileComposite', function (residentId) {
  return {
    find: function () {
      // Default fields for anonymous users
      let fields = {
        _id: 1,
        firstName: 1,
      }

      // Some fields should only be published to authenticated users
      if (Meteor.user) {
        fields.lastInitial = 1;
        fields.homeId = 1;
        fields.onHiatus = 1;
        fields.departed = 1;
      }

      return Residents.find(residentId, { fields });
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
