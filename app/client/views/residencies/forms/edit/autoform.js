AutoForm.addHooks(['editResidencyForm'], {
  onSuccess() {
    // Hide the 'edit residency form' modal
    Session.set('refresh-residents', true);
    FlashMessages.clear();
    Modal.hide('editResidencyModal');
  },
  onError(formType, error) {
    FlashMessages.sendError(error.message, {
      autoHide: true,
      hideDelay: 3000,
    });
  },
});
