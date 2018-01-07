AutoForm.addHooks("newUserForm", {
  'onSubmit': function (user) {
    // Get reference to form context
    var form = this;
    // Add user
    Meteor.call("addUser", user, function (error, userId) {
      if (error) {
        console.log(error);
        // Cancel form submission
        form.result(false);
      }
      // If is admin
      if (user.isAdmin) {
        // Add user to admin role
        Meteor.call("addUserToAdminRole", userId);
      }

      // Finish submitting the form
      form.done();
    });
  },
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newUser');
  }
});
