Template.deleteActivityTypeConfirmation.events({
  'click #confirm-delete' (event, templateInstance) {
    // Get activity type ID
    const activityTypeId = templateInstance.data.activityTypeId;

    // Delete activity type
    ActivityTypes.remove(activityTypeId);

    // Dismiss confirmation
    Modal.hide('deleteActivityTypeConfirmation');
  }
});
