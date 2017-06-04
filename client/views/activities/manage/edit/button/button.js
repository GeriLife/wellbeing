Template.editActivityButton.events({
  "click .edit-button" () {
    // Get Activity template data context
    const activity = this.activity;

    // Show the Edit Activity modal
    Modal.show("editActivity", { activity });
  }
});
