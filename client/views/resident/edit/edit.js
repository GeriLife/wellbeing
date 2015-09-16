Template.editResident.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get reference to router
  var router = Router.current();

  // Get Resident ID from router parameter
  var residentId = router.params.residentId;

  // Subscribe to single resident, based on Resident ID
  instance.subscribe('singleResident', residentId);

  // Subscribe to all homes, for the home select options
  instance.subscribe('allHomes');

  // Subscribe to all groups
  instance.subscribe('allGroups');
};

AutoForm.addHooks(['editResidentForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('editResident');
  }
});
