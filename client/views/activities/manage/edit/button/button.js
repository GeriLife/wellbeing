Template.editActivityButton.events({
  "click .edit-button" () {
    // Get Activity ID from template instance
    var activity = this;

    // Show the Edit Activity modal
    Modal.show("editActivity", { activity });
  }
});
