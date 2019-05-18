AutoForm.addHooks(['assignManagerForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('assignManager');
  },
  'onError': function(formType, error) {
    if (error.message) {
        FlashMessages.sendError(error.message, { autoHide: false });
    }
  }
});
