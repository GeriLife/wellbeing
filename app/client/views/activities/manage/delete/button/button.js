Template.deleteActivityButton.events({
  "click .delete-button" () {
    // Get reference to activity ID
    const activity = this.activity;

    // Show the confirmation dialogue
    Modal.show("deleteActivityConfirmation", { activity });
  }
});
