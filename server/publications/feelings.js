Meteor.publish('residentFeelings' (residentId) {
  // Get all feelings for a given residentId
  return Feelings.find({ residentId });
});
