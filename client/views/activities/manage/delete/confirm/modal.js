Template.deleteActivityConfirmation.events({
  "click #confirm-delete": function (event, instance) {
    // Get Activity ID
    var activityId = instance.data.activityId;

    // Delete Activity
    Activities.remove(activityId, function () {
      // Dismiss the modal dialogue
      Modal.hide("deleteActivityConfirmation");
    });
  }
});
