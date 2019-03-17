Meteor.publish({
  userPermissions(userId) {
    return Permissions.find({ userId });
  }
});
