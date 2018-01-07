Meteor.publish('singleResidency', function (residentId, homeId) {
  // Publish a single residency
  return Residencies.find({ residentId, homeId });
});
