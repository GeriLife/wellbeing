Meteor.methods({
  getAllActivityTypes() {
    return ActivityTypes.find({}, {sort: {name: 1}}).fetch();
  },

  getAllActivityTypeIds: function () {
    // Get all Activity Types
    const activityTypes = Meteor.call('getAllActivityTypes');

    // Create an array of Activity Type IDs
    return activityTypes.map((activityType) => activityType._id);

  },

  addActivityType(formData) {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }

    return ActivityTypes.insert(formData);
  },

  removeActivityType(activityTypeId) {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }

    return ActivityTypes.remove(activityTypeId);
  },

  getActivityTypeData(activityTypeId) {
    return ActivityTypes.findOne(activityTypeId);
  },
});
