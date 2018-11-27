AutoForm.hooks({
  residentForm: {
    onSuccess: function (formType, result) {
      console.log('success')
      console.log(formType)
      console.log(result)
      console.log(this.currentDoc)
      // Hide the modal dialogue
      Modal.hide('residentForm');
    },
  }
});
