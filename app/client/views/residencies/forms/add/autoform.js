AutoForm.hooks({
  addNewResidentAndResidency: {
    onSuccess,
    onError
  },
  addResidencyForExistingResident: {
    onSuccess,
    onError
  }
});

function onError(formType, error) {
  if (error.error) {
    FlashMessages.sendError(`${error.error}: ${error.reason}`, {
      autoHide: true,
      hideDelay: 3000
    });
  } else if (error.message) {
    /* If a form input is invalid flash message is displayed*/
    FlashMessages.sendError(error.message, { autoHide: true, hideDelay:3000 });
  }

}

function onSuccess(formType, success) {
  // check if submission was successful
  if (success) {
    // Hide modal dialogue
    Modal.hide("addResidencyModal");
    FlashMessages.clear();
  }
}
