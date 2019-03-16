Meteor.methods({
  addSingleUserPermissions(userId, groupIds) {
    if (groupIds.length > 0) {
      groupIds.forEach(groupId => {
        console.log(userId, groupId);
        Permissions.insert({ userId, groupId });
      });
    }

    return true;
  }
});
