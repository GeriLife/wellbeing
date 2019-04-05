Meteor.publish("allHomes", function() {
  // All homes publication
  return Homes.find();
});

Meteor.publish("singleHome", function(homeId) {
  // Publish a single home
  return Homes.find(homeId);
});

Meteor.publish("homesBelongingToGroup", function(groupId) {
  // Publish homes belonging to group
  return Homes.find({ groupId });
});

Meteor.publish("currentUserVisibleHomes", function() {
  const userId = Meteor.userId();

  // Group IDs can be obtained through Permissions
  const userGroups = Meteor.call("getSingleUserGroupIds", userId);

  return Homes.find({
    groupId: { $in: userGroups }
  });
});
