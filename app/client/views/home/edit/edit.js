Template.editHome.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get reference to router
  var router = Router.current();

  // Get Home ID from router parameter
  var homeId = router.params.homeId;

  // Subscribe to single home, based on Home ID
  instance.subscribe('singleHome', homeId);

  // Subscribe to all groups, for the group select options
  instance.subscribe('allGroups');
};

AutoForm.addHooks(['editHomeForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('editHome');
  }
});
