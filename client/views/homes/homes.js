Template.homes.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to all homes
  instance.subscribe('allHomes');

  // Subscribe to all groups
  instance.subscribe('allGroups');
};

Template.homes.events({
  'click #new-home': function () {
    // Show the edit home modal
    Modal.show('newHome');
  },
  'click #new-group': function () {
    // Show the edit home modal
    Modal.show('newGroup');
  }
});

Template.homes.helpers({
  'groups': function () {
    // Get all Groups
    return Groups.find();
  }
});
