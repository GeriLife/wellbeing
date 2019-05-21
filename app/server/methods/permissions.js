Meteor.methods({
  addSingleUserPermissions(userId, groupIds) {
    // Remove existing user permissions
    Permissions.remove({ userId });

    // add new permissions, if any group IDs provided
    if (groupIds.length > 0) {
      groupIds.forEach(groupId => {
        Permissions.insert({ userId, groupId });
      });
    }

    return true;
  },
  getSingleUserGroupIds(userId) {
    // Check for existing permissions
    const existingUserPermissions = Permissions.find({ userId }).fetch();

    return existingUserPermissions.map(permission => permission.groupId);
  },
  getGroupsManagedByCurrentUser() {
    const userId = Meteor.userId();
    const userIsAdmin = Roles.userIsInRole(userId, "admin");
    if (!userIsAdmin) {
      return Permissions.find({ $and: [{userId}, { isManager: true }] }).fetch();
     
    }
  }
});
