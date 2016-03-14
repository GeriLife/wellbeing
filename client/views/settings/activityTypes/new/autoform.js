AutoForm.addHooks(['newActivityTypeForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newActivityType');
  }
});
