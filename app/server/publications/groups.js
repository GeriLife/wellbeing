Meteor.publish('allGroups', function () {
  // Publish all groups
  return Groups.find();
});

Meteor.publish('singleGroup', function (groupId) {
  // Publish only one group, specified as groupId
  return Groups.find(groupId);
});
