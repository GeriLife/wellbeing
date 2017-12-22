Template.editActivity.onCreated(function () {
  // Get reference to template instance
  var instance = this;

  instance.subscribe('allCurrentResidents');
  instance.subscribe('allHomes');
  instance.subscribe('allActivityTypes');
  instance.subscribe('allRolesExceptAdmin');
});
