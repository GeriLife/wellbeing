Template.rolesSettings.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to roles publication
  instance.subscribe('allRolesExceptAdmin');
};

Template.rolesSettings.helpers({
  "roles": function () {
    // Get all roles except 'admin'
    var roles = Meteor.roles.find({name: {$ne: "admin"}}, {sort: {name: 1}}).fetch();

    return roles;
  }
});

Template.rolesSettings.events({
  'click #add-role': function () {
    // Show the add activity modal
    Modal.show('newRole');
  }
});
