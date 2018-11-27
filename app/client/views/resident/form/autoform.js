AutoForm.hooks({
  residentForm: {
    onSuccess: function (formType, result) {
      // Hide the modal dialogue
      Modal.hide('residentForm');
    },
  }
});
