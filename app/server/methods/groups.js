import { isCurrentUserAdmin } from '../utils/user';

function addOrUpdateAGroup(formData) {
  if (!isCurrentUserAdmin()) {
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
});
