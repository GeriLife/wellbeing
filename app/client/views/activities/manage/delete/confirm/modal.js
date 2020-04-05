Template.deleteActivityConfirmation.events({
  'click #confirm-delete'() {
    // Get Activity ID
    const activityId = this.activity._id;

    // Delete Activity
    Meteor.call('removeActivity', activityId, function (err) {
      if (!err) {
        // Dismiss the modal dialogue
        Modal.hide('deleteActivityConfirmation');
        Session.set('activity-deleted', true);
      }
    });
  },
});
