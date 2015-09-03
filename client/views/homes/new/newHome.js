Template.addHome.created = function () {
  // Create reference to template instance
  var instance = this;

  // Subscribe to all Groups
  instance.subscribe('allGroups');
};
