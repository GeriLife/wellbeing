Meteor.methods({
  "addUser": function (user) {
    // Add new user
    var userId = Accounts.createUser(user);

    return userId;
  },
  "addUserToAdminRole": function (userId) {
    // Add user to admin role
    Roles.addUsersToRoles(userId, "admin");
  }
});
