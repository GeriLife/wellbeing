AutoForm.addHooks(['newRoleForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newActivityType');
  }
});
