Template.homes.created = function () {
  // Get reference to template instance
  const templateInstance = this;

  // Subscribe to all homes
  templateInstance.subscribe('allHomes');

  // Subscribe to all groups
  templateInstance.subscribe('allGroups');
};

Template.homes.events({
  'click #new-group': function () {
    // Show the group modal (create new)
    Modal.show('groupModal');
  }
});

Template.homes.helpers({
  'groups': function () {
    // Get all Groups
    return Groups.find();
  }
});
