Template.editActivityButton.events({
  "click .edit-button": function (event, template) {
    // Get Activity ID from template instance
    var activityId = this.activityId;

    // Show the Edit Activity modal
    Modal.show("editActivity", {activityId: activityId});
  }
});
