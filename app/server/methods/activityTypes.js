Meteor.methods({
  getAllActivityTypes() {
    return ActivityTypes.find({}, { sort: { name: 1 } }).fetch();
  },

  getAllActivityTypeIdsApi: function () {
    const activityTypes = Meteor.call('getAllActivityTypes');
    return activityTypes.map((activity) => ({
      ...activity,
      activityCount: Activities.find({
        activityTypeId: activity._id,
      }).count(),
    }));
  },

  getAllActivityTypeIds: function () {
    // Get all Activity Types
    const activityTypes = Meteor.call('getAllActivityTypes');

    // Create an array of Activity Type IDs
    return activityTypes.map((activityType) => activityType._id);
  },

  addActivityType(formData) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }

    return ActivityTypes.insert(formData);
  },

  removeActivityTypeApi({ activityTypeId }) {
    return Meteor.call('removeActivityType', activityTypeId, this.userId);
  },

  removeActivityType(activityTypeId, userId) {
    if (!Roles.userIsInRole(userId || Meteor.userId(), 'admin')) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }

    return ActivityTypes.remove(activityTypeId);
  },

  getActivityTypeData(activityTypeId) {
    return ActivityTypes.findOne(activityTypeId);
  },
});
