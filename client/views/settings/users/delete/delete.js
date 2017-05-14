Template.deleteUser.events({
  "click #confirm-delete": function () {
    // Get user from data context
    const user = this.data;

    // Confirmed. Delete user.
    Meteor.call('deleteUser', user, function () {
      // Hide the delete user dialogue
      Modal.hide('deleteUser');
    });
  }
});
