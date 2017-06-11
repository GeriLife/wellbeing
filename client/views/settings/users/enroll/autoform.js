AutoForm.addHooks('usersEnrollForm', {
  onError (formType, error) {
    // Show the error to end user
    // TODO: add internationalization support for specefic error type(s)
    FlashMessages.sendError(`${error.error}: ${error.reason}`, { autoHide: false });
  }
});
