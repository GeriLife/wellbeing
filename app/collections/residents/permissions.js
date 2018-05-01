import Residents from './';

Residents.allow({
  'insert': function () {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for insert privilege check
    let userCanInsert;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanInsert = (userId && userIsAdministrator);

    return userCanInsert;
  },
  'update': function () {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for update privilege check
    let userCanUpdate;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanUpdate = (userId && userIsAdministrator);

    return userCanUpdate;
  },
  'remove': function () {
    /// Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for insert privilege check
    let userCanRemove;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanRemove = (userId && userIsAdministrator);

    return userCanRemove;
  }
});
