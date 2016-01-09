AutoForm.addHooks("editUserForm", {
  'onSubmit': function (user) {
    // Get reference to form context
    var form = this;

    // Re-attach the user ID
    user._id = this.docId;

    // Add user
    Meteor.call("editUserFormSubmit", user, function (error, userId) {
      if (error) {
        console.log(error);
        // Cancel form submission
        form.result(false);
      }
      // If is admin
      if (user.isAdmin) {
        // Add user to admin role
        Meteor.call("addUserToAdminRole", userId);
      } else {
        // Remove user from admin role
        Meteor.call("removeUserFromAdminRole", userId);
      }

      // Finish submitting the form
      form.done();
    });
  },
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('editUser');
  }
});
