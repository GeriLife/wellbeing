AutoForm.addHooks(['newGroupForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newGroup');
  }
});
