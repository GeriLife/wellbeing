Template.usersSettings.created = function () {
  // Get reference to Template instance
  var instance = this;

  // Subscribe to all users
  instance.subscribe("allUsers");
};

Template.usersSettings.helpers({
  "users": function () {
    // Get all users
    var users = Meteor.users.find().fetch();

    return users;
  },
  "email": function () {
    if (this.emails && this.emails.length) {
      // Return the user's first email address
      return this.emails[0].address;
    }
  },
  "roles": function () {
    if (this.roles && this.roles.length) {
      // Return comma separated list of roles
      return this.roles.join();
    }
  }
});

Template.usersSettings.events({
  'click #add-user': function () {
    // Show the add activity modal
    Modal.show('newUser');
  },
  'click .delete-user': function (event, template) {
    // Save reference to user
    var user = this;

    // Show edit modal, passing in user as data context
    Modal.show("deleteUser", {"data": user}, {});
  },
  'click .edit-user': function (event, template) {
    // Save reference to user
    var user = this;

    // Show edit modal, passing in user as data context
    Modal.show("editUser", {"data": user}, {});
  }
});
