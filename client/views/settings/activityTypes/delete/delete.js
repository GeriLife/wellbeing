Template.deleteActivityType.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get Activity Type ID
  const activityTypeId = templateInstance.data.activityTypeId;

  // Create reactive variable to store count activities for current type
  templateInstance.activityCount = new ReactiveVar(undefined);

  Meteor.call('getActivityCountByActivityTypeId', activityTypeId, function (error, activityCount) {
    if (error) {
      throw new Meteor.Error('could not get count of activies');
    } else {
      templateInstance.activityCount.set(activityCount);
    }
  });
});

Template.deleteActivityType.helpers({
  activityTypeHasNoActivities () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get count of activities for current type (from reactive variable)
    const activityCount = templateInstance.activityCount.get();

    // Check whether activity type has any activities
    if (activityCount === 0) {
      // Activity type has no activity count
      return true;
    } else {
      return false;
    }
  }
});

Template.deleteActivityType.events({
  'click .delete-activity-type' (event, templateInstance) {
    // Get reference to activity type ID
    const activityTypeId = templateInstance.data.activityTypeId;

    // Show the confirmation dialogue
    Modal.show("deleteActivityTypeConfirmation", { activityTypeId });
  }
});
