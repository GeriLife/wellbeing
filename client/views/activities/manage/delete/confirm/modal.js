Template.deleteActivityConfirmation.events({
  "click #confirm-delete" () {
    // Get Activity ID
    const activityId = this.activity._id;

    // Delete Activity
    Activities.remove(activityId, function () {
      // Dismiss the modal dialogue
      Modal.hide("deleteActivityConfirmation");
    });
  }
});
