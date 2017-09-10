Meteor.publish('residentFeelings', function (residentId) {
  // Get all feelings for a given residentId
  return Feelings.find({ residentId });
});

// Count of feelings for a given residentId
// primarily designed to 'signal' the resident feelings chart to re-render
// TODO: figure out a 'cleaner' way to signal the feelings chart to re-render
// https://forums.meteor.com/t/send-reactive-signal-from-server-to-client/39141
Meteor.publish('residentFeelingsCount', function(residentId) {
  // Create a counter for the current residentId
  // in the form of 'resident-{ ID }-feelings-count'
  Counts.publish(
    this,
    `resident_${ residentId }_feelings_count`,
    Feelings.find({ residentId })
  );
});
