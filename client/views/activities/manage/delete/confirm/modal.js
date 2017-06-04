Template.deleteActivityConfirmation.events({
  "click #confirm-delete" () {
    console.log(this);
    // Get Activity ID
    const activityId = this.activity._id;
    console.log(activityId);
    // Delete Activity
    Activities.remove(activityId, function () {
      // Dismiss the modal dialogue
      Modal.hide("deleteActivityConfirmation");
    });
  }
});
