import Groups from './';

Groups.allow({
  insert () {
    // Get user ID
    const userId = Meteor.userId();

    // Check if user is administrator
    const userIsAdmin = Roles.userIsInRole(userId, ['admin']);

    if (userIsAdmin) {
      // admin user can insert
      return true;
    }
  },
  update () {
    // Get user ID
    const userId = Meteor.userId();

    // Check if user is administrator
    const userIsAdmin = Roles.userIsInRole(userId, ['admin']);

    if (userIsAdmin) {
      // admin user can update
      return true;
    }
  }
});
