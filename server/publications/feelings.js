Meteor.publish('residentFeelings', function (residentId) {
  // Get all feelings for a given residentId
  return Feelings.find({ residentId });
});
