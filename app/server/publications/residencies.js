Meteor.publish("singleResidency", function(residentId, homeId) {
  // Publish a single residency
  return Residencies.find({ residentId, homeId });
});

Meteor.publish("allResidencies", function() {
  // Publish all residencies
  return Residencies.find();
});

Meteor.publish("allCurrentResidencies", function() {
  // Publish all current residencies
  return Residencies.find({
    moveOut: { $exists: false }
  });
});

Meteor.publish("currentUserVisibleResidencies", function(includeDeparted) {
  const selector = {};

  const userId = Meteor.userId();

  const userIsAdmin = Roles.userIsInRole(userId, "admin");

  if (!userIsAdmin) {
    const userVisibleHomeIds = Meteor.call("getUserVisibleHomeIds", userId);

    selector.homeId = { $in: userVisibleHomeIds };
  }

  if (!includeDeparted) {
    // non-departed residents should not have move out date
    selector.moveOut = {
      $exists: false
    };
  }

  return Residencies.find(selector);
});
