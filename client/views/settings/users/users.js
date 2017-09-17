Template.usersSettings.created = function () {
  // Get reference to Template instance
  var instance = this;

  // Subscribe to all users
  instance.subscribe("allUsers");
};

Template.usersSettings.events({
  'click #add-user': function () {
    // Show the add activity modal
    Modal.show('newUser');
  },
}):
