AutoForm.addHooks('usersEnrollForm', {
  onError (formType, error) {
    Session.set('refresh-user-list', true);
    // Show the error to end user
    // TODO: add internationalization support for specefic error type(s)

    // Make sure there is an error type, otherwise don't show error
    // to prevent 'unknown' or undefined error messages from triggering flash message
    if (error.error) {
      FlashMessages.sendError(`${error.error}: ${error.reason}`, { autoHide: true, hideDelay: 3000 });
    }else if(error.message){
      /* If a form input is invalid flash message is displayed*/
      FlashMessages.sendError(error.message, { autoHide: true, hideDelay: 3000 });
      
    }
  },

  onSuccess() {
    Session.set('refresh-user-list', true);
  },
});
