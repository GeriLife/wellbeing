AutoForm.hooks({
  editResidencyForm: {
    onSuccess() {
      // Hide the 'edit residency form' modal
      Modal.hide("editResidencyModal");
    },
    onError(formType, error) {
      
        FlashMessages.sendError(error.message, {
          autoHide: false
        });
      
    }
  }
});
