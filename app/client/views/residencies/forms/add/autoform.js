AutoForm.hooks({
  addNewResidentAndResidency: {
    onSuccess (formType, success) {
      // check if submission was successful
      if (success) {
        // Hide modal dialogue
        Modal.hide('addResidencyModal');
      }
    },
  },
  addResidencyForExistingResident: {
    onSuccess (formType, success) {
      // check if submission was successful
      if (success) {
        // Hide modal dialogue
        Modal.hide('addResidencyModal');
      }
    },
  }
});
