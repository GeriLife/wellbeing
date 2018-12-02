Meteor.publish('singleResidency', function (residentId, homeId) {
  // Publish a single residency
  return Residencies.find({ residentId, homeId });
});

Meteor.publish('allResidencies', function () {
  // Publish all residencies
  return Residencies.find();
});

Meteor.publish('allCurrentResidencies', function () {
  // Publish all current residencies
  return Residencies.find({
    moveOut: {$exists: false},
  });
});
