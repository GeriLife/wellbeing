AutoForm.hooks({
  addNewResidentAndResidency: {
    onSuccess(formType, success) {
      // check if submission was successful
      if (success) {
        // Hide modal dialogue
        Modal.hide("addResidencyModal");
      }
    },
    onError
  },
  addResidencyForExistingResident: {
    onSuccess(formType, success) {
      // check if submission was successful
      if (success) {
        // Hide modal dialogue
        Modal.hide("addResidencyModal");
      }
    },
    onError
  }
});

function onError(formType, error) {
  if (error.error) {
    FlashMessages.sendError(`${error.error}: ${error.reason}`, {
      autoHide: false
    });
  } else if (error.message) {
    /* If a form input is invalid flash message is displayed*/
    FlashMessages.sendError(error.message, { autoHide: false });
  }
}
