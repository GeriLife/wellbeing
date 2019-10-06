AutoForm.addHooks(['residentForm'], {
  onSuccess: function(formType, result) {
    // Hide the modal dialogue
    Modal.hide('residentForm');
    FlashMessages.clear();
  },
  onError(type, error) {
    FlashMessages.sendError(error.message, {
      autoHide: true,
      hideDelay: 3000,
    });
  },
});
