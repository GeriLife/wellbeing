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
  const selector = {};

  const userId = Meteor.userId();

  const userIsAdmin = Roles.userIsInRole(userId, "admin");

  // non-admin should see only homes belonging to assigned group(s)
  if (!userIsAdmin) {
    // Group IDs can be obtained through Permissions
    const userGroups = Meteor.call("getSingleUserGroupIds", userId);

    selector.groupId = { $in: userGroups };
  }

  return Homes.find(selector);
});
