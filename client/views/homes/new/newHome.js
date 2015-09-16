Template.newHome.created = function () {
  // Create reference to template instance
  var instance = this;

  // Subscribe to all Groups
  instance.subscribe('allGroups');
};

AutoForm.addHooks(['newHomeForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newHome');
  }
});
