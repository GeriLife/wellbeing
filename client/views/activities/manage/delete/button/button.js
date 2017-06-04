Template.deleteActivityButton.events({
  "click .delete-button" () {
    // Get reference to activity ID
    var activity= this;

    // Show the confirmation dialogue
    Modal.show("deleteActivityConfirmation", { activity });
  }
});
