Template.deleteActivityTypeConfirmation.events({
  'click #confirm-delete'(event, templateInstance) {
    // Get activity type ID
    const activityTypeId = templateInstance.data.activityTypeId;

    // Delete activity type
    Meteor.call('removeActivityType', activityTypeId, function(
      error
    ) {
      if (!error) {
        // Dismiss confirmation
        Modal.hide('deleteActivityTypeConfirmation');
        Session.set('refresh-activitytype-list',true);

      }
    });
  },
});
