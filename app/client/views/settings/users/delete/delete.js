Template.deleteUser.events({
  "click #confirm-delete": function () {
    // Get user from data context
    const user = this.data;

    // Confirmed. Delete user.
    Meteor.call('deleteUser', user, function () {
      Session.set('refresh-user-list', true);

      // Hide the delete user dialogue
      Modal.hide('deleteUser');
    });
  }
});
