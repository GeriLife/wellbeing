AutoForm.addHooks(["assignManagerForm"], {
  onSuccess: function() {
    // Hide the modal dialogue
    Modal.hide("assignManager");
    FlashMessages.clear();
  },
  onError: function(formType, error) {
    FlashMessages.clear();
    if (error.message) {
      FlashMessages.sendError(error.message, {
        autoHide: true,
        hideDelay: 3000
      });
    }
  }
});
