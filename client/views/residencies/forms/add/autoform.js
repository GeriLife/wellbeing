AutoForm.hooks({
  'addNewResidentAndResidency': {
    onSuccess (formType, success) {
      // check if submission was successful
      if (success) {
        // Hide modal dialogue
        Modal.hide('addResidencyModal');
      }
    },
  },
});
