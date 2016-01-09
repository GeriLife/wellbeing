Meteor.methods({
  "addUser": function (user) {
    // Add new user
    var userId = Accounts.createUser(user);

    return userId;
  },
  "editUserFormSubmit": function (user) {
    // Get user email
    var userEmail = user.email;

    var userId = user._id;

    // Edit user, setting first email
    Meteor.users.update(userId, {$set: {"emails.0.address": userEmail}});

    return userId;
  },
  "addUserToAdminRole": function (userId) {
    // Add user to admin role
    Roles.addUsersToRoles(userId, "admin");
  }
});
