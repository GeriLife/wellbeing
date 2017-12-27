Meteor.methods({
  'getAllActivityTypeIds': function () {
    // TODO: determine how to secure this method to prevent client abuse

    // Get all Activity Types
    var activityTypes = ActivityTypes.find().fetch();

    var activityTypeIds = [];

    // Create an array of Activity Type IDs
    activityTypes.forEach(function (activityType) {
      activityTypeIds.push(activityType._id);
    });

    return activityTypeIds;
  }
});
