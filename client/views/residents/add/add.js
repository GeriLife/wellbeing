Template.addResident.created = function () {
  // Create reference to template instance
  var instance = this;

  // Subscribe to all Groups
  instance.subscribe('allGroups');

  // Subscribe to all Homes
  instance.subscribe('allHomes');
};
