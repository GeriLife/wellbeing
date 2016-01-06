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
