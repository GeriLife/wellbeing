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

Meteor.publish("currentUserVisibleResidencies", function(departed) {
  const userId = Meteor.userId();

  const userVisibleHomeIds = Meteor.call("getUserVisibleHomeIds", userId);

  // find all residencies by default
  let isDeparted;

  // toggle whether or not to show departed
  // residencies with move out date are departed
  if (departed === null) {
    isDeparted = {};
  } else {
    isDeparted = {
      moveOut: {
        $exists: departed
      }
    };
  }

  return Residencies.find({
    homeId: { $in: userVisibleHomeIds },
    ...isDeparted
  });
});
