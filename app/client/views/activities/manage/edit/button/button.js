Template.editActivityButton.events({
  "click .edit-button" () {
    // Get Activity template data context
    const activity = this.activity;

    // Show the Activity Form Modal
    Modal.show("activityFormModal", { activity });
  }
});
