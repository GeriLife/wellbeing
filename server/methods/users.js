Meteor.methods({
  addUser (user) {
    // Add new user
    var userId = Accounts.createUser(user);

    return userId;
  },
  addUserToAdminRole (userId) {
    // Add user to admin role
    Roles.addUsersToRoles(userId, "admin");
  },
  deleteUser (user) {
    console.log(user);
    // Make sure user object provided with '_id' property
    check(user, Object);
    check(user._id, String);

    // Get current user id, for security check
    const currentUserId = this.userId;

    // Make sure current user has 'admin' role
    if (Roles.userIsInRole(currentUserId, 'admin')) {
      // Make sure user can't delete own Account
      if (currentUserId !== user._id) {
        // If safe, delete provided user Object
        Meteor.users.remove(user);
      }
    }
  },
  editUserFormSubmit (user) {
    // Get user email
    var userEmail = user.email;

    var userId = user._id;

    // Edit user, setting first email
    Meteor.users.update(userId, {$set: {"emails.0.address": userEmail}});

    return userId;
  },
  removeUserFromAdminRole (userId) {
    // Add user to admin role
    Roles.removeUsersFromRoles(userId, "admin");
  }
});
