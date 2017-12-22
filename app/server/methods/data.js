Meteor.methods({
  exportAllData () {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Check if current user is Admin
    const currentUserIsAdmin = Roles.userIsInRole(currentUserId, 'admin');

    // If current user is admin, construct and return object with all data
    if (currentUserIsAdmin) {
      const exportData = {
        activities: Activities.find().fetch(),
        activityTypes: ActivityTypes.find().fetch(),
        feelings: Feelings.find().fetch(),
        groups: Groups.find().fetch(),
        homes: Homes.find().fetch(),
        residents: Residents.find().fetch(),
        roles: Meteor.roles.find().fetch(),
        settings: Settings.find().fetch(),
        users: Meteor.users.find().fetch(),
      }

      return exportData;
    }
  }
});
