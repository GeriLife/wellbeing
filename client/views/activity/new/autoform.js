AutoForm.addHooks(['newActivityForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newActivity');
  }
});
