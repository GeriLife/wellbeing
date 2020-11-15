import { isCurrentUserAdmin } from '../utils/user';

Meteor.methods({
  addSingleUserPermissions(userId, groupIds) {
    if (!isCurrentUserAdmin()) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }
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
  getHomesOfCurrentUser() {
    const permissions = Permissions.find({
      userId: this.userId,
    }).fetch();
    const groupPermissionMap = permissions.reduce(
      (acc, current) => ({ ...acc, [current.groupId]: current }),
      {}
    );
    return Homes.find({
      groupId: {
        $in: Object.keys(groupPermissionMap),
      },
    }).map((home) => ({
      homeId: home._id,
      ...groupPermissionMap[home.groupId],
    }));
  },
  getGroupsManagedByCurrentUser(user) {
    const userId = user || Meteor.user();
    const userIsAdmin = Roles.userIsInRole(userId, "admin");
    if (!userIsAdmin) {
      return Permissions.find({
        $and: [{ userId }, { isManager: true }]
      }).fetch();
    }
  },
  revokeManagerPermission({ groupId, userId }) {
    /* This action allowed if current user is admin*/
    const currentUserId = this.userId;
    const userIsAdmin = Roles.userIsInRole(currentUserId, "admin");
    if (userIsAdmin) {
      /* Revoke manager right of the given user from the given group */
      return Permissions.update(
        { groupId, userId },
        { $set: { isManager: false } }
      );
    }
  }
});
