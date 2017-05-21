AutoForm.addHooks(['groupForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newGroup');
  }
});
