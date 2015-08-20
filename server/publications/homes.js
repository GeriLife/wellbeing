Meteor.publish('allHomes', function () {
  // All homes publication
  return Homes.find();
});

Meteor.publish('homesBelongingToGroup', function (groupId) {
  // All homes publication
  return Homes.find({groupId: groupId});
});
