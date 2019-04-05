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

Meteor.publish("currentUserVisibleActiveResidencies", function() {
  const userId = Meteor.userId();

  const userVisibleHomeIds = Meteor.call("getUserVisibleHomeIds", userId);

  // do not show departed residents
  // residencies without moved out date
  const notDeparted = {
    moveOut: {
      $exists: false
    }
  };

  return Residencies.find({
    homeId: { $in: userVisibleHomeIds },
    ...notDeparted
  });
});
