AutoForm.addHooks('usersEnrollForm', {
  onError (formType, error) {
    // Show the error to end user
    // TODO: add internationalization support for specefic error type(s)

    // Make sure there is an error type, otherwise don't show error
    // to prevent 'unknown' or undefined error messages from triggering flash message
    if (error.error) {
      FlashMessages.sendError(`${error.error}: ${error.reason}`, { autoHide: false });
    }
  }
});
