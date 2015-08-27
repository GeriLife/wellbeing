Meteor.methods({
  'getAllActivityTypeIds': function () {
    // TODO: determine how to secure this method to prevent client abuse

    // Get all Activity Types
    var activityTypes = ActivityTypes.find().fetch();

    // Create an array of Activity Type IDs
    var activityTypeIds = _.map(activityTypes, function (activityType) {
      return activityType._id;
    });

    return activityTypeIds;
  },
});
