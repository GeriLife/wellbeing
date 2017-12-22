AutoForm.hooks({
  'editResidencyForm': {
    onSuccess () {
      // Hide the 'edit residency form' modal
      Modal.hide('editResidencyModal');
    }
  }
})
