Meteor.publish('singleResidency', function (residentId, homeId) {
  // Publish a single residency
  return Residencies.find({ residentId, homeId });
});

Meteor.publish('allCurrentResidencies', function () {
  // Find all current residencies
  return Residencies.find({
    moveOut: {$exists: false},
  });
});
