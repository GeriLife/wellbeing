AutoForm.addHooks('userForm', {
  onSubmit: function(user) {
    // Get reference to form context
    const form = this;
    const isEdit = !!this.docId;

    if (isEdit) {
      // Re-attach the user ID
      user._id = this.docId;
    }
    const methodName = isEdit ? 'editUserFormSubmit' : 'addUser';
    // Add user
    Meteor.call(methodName, user, function(error, userId) {
      const params = {
        isEdit: true,
        error,
        user,
        userId,
        form,
      };
      handleCallback(params);
    });
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

function handleCallback({ isEdit, error, user, userId, form }) {
  if (error) {
    const defaultErrorMessage = isEdit
      ? TAPi18n.__('usersSettings-editUser-defaultFailureText')
      : TAPi18n.__('usersSettings-addUser-defaultFailureMessage');

    /* If a form input is invalid flash message is displayed*/
    FlashMessages.sendError(error.message || defaultErrorMessage, {
      autoHide: true,
    });
    form.result(false);
  }

  addUserAsAdmin(user, userId);
  // Finish submitting the form
  form.done();
}
