AutoForm.addHooks(['editResidencyForm'], {
  onSuccess() {
    // Hide the 'edit residency form' modal
    Modal.hide('editResidencyModal');
    FlashMessages.clear();
  },
  onError(formType, error) {
    FlashMessages.sendError(error.message, {
      autoHide: true,
      hideDelay: 3000,
    });
  },
});
