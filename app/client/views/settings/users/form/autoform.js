AutoForm.addHooks('userForm', {
  onSubmit: function(user) {
    // Get reference to form context
    const form = this;
    if (!!this.docId) {

      // Re-attach the user ID
      user._id = this.docId;

      // Add user
      Meteor.call('editUserFormSubmit', user, function(
        error,
        userId
      ) {
        if (error) {
          /* If a form input is invalid flash message is displayed*/
          FlashMessages.sendError(
            error.message ||
              Tapi18n.__('usersSettings-editUser-defaultFailureText'),
            { autoHide: true }
          );
          form.result(false);
        }

        addUserAsAdmin(user, userId);
        // Finish submitting the form
        form.done();
      });
    } else {
      // Add user
      Meteor.call('addUser', user, function(error, userId) {
        if (error) {
          /* If a form input is invalid flash message is displayed*/
          FlashMessages.sendError(
            error.message ||
              Tapi18n.__(
                'usersSettings-addUser-defaultFailureMessage'
              ),
            { autoHide: true }
          );

          form.result(false);
        }

        addUserAsAdmin(user, userId);

        // Finish submitting the form
        form.done();
      });
    }
  },
  onSuccess: function() {
    // Hide the modal dialogue
    Modal.hide('manageUser');
    FlashMessages.clear();
  },
  onError(formType, error) {
    if (error.message) {
      /* If a form input is invalid flash message is displayed*/
      FlashMessages.sendError(error.message, {
        autoHide: true,
        hideDelay: 3000,
      });
    }
  },
});

function addUserAsAdmin(user, userId) {
  // If is admin
  if (user.isAdmin) {
    // Add user to admin role
    Meteor.call('addUserToAdminRole', userId);
  } else {
    // Remove user from admin role
    Meteor.call('removeUserFromAdminRole', userId);
  }
}
