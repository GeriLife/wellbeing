AutoForm.hooks({
  editResidencyForm: {
    onSuccess() {
      // Hide the 'edit residency form' modal
      Modal.hide("editResidencyModal");
      FlashMessages.clear();
    },
    onError(formType, error) {
      FlashMessages.sendError(error.message, {
        autoHide: false,
        hideDelay: 3000
      });
    }
  }
});
