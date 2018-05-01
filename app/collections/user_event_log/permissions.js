import UserEventLog from './';

UserEventLog.allow({
  insert: function () {
    // Make sure a user is signed in
    if (Meteor.userId()) {
      return true;
    }

    return false;
  },
  update: function () {
    // Get current user ID
    var currentUserId = Meteor.userId();

    // Check if current user has Admin role
    var currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

    // Only show edit column for users with Admin role
    if (currentUserIsAdmin) {
      return true;
    } else {
      return false;
    }
  },
  remove: function () {
    // Get current user ID
    var currentUserId = Meteor.userId();

    // Check if current user has Admin role
    var currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

    // Only show edit column for users with Admin role
    if (currentUserIsAdmin) {
      return true;
    } else {
      return false;
    }
  }
});
