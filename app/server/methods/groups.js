import { isCurrentUserAdmin } from '../utils/user';

function addOrUpdateAGroup(formData) {
  if (!isCurrentUserAdmin(this.userId)) {
    throw new Meteor.Error(500, 'Operation not allowed');
  }

  if (formData._id) {
    const { _id, modifier } = formData;
    return Groups.update({ _id }, modifier);
  }
  return Groups.insert(formData);
}
function canUserAccessGroup(groupId) {
  const userGroupIds = Meteor.call(
    'getSingleUserGroupIds',
    Meteor.userId()
  );
  return userGroupIds.includes(groupId);
}

function currentUserGroups() {
  if (!this.userId) {
    return [];
  }
  const userId = this.userId;
  let unsortedGroups = [];

  // Admin users can see all groups
  if (Roles.userIsInRole(userId, ['admin'])) {
    unsortedGroups = Groups.find().fetch();
  } else {
    // Check for existing user permissions
    const existingUserPermissions = Permissions.find({
      userId,
    }).fetch();

    const existingUserPermissionGroupIds = existingUserPermissions.map(
      (permission) => permission.groupId
    );

    unsortedGroups = Groups.find({
      _id: { $in: existingUserPermissionGroupIds },
    }).fetch();
  }

  return _.sortBy(unsortedGroups, (group) =>
    group.name.toLowerCase()
  );
}

Meteor.methods({
  addOrUpdateAGroup,
  canUserAccessGroup,
  getGroupById(groupId) {
    if (
      isCurrentUserAdmin() ||
      Meteor.call('canUserAccessGroup', groupId)
    ) {
      return Groups.findOne(groupId);
    }
    throw new Meteor.Error(500, 'Operation not allowed');
  },

  currentUserGroups,
});
