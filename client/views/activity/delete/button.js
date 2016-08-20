Template.deleteActivityButton.events({
  "click .delete-button": function (event, instance) {
    // Get reference to activity ID
    var activityId = instance.data.activityId;
    
    // Show the confirmation dialogue
    Modal.show("deleteActivityConfirmation", {activityId: activityId});
  }
});
