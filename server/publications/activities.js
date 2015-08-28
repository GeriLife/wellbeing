Meteor.publish('allActivities', function () {
  return Activities.find();
});

Meteor.publish('userActivities', function (userId) {
  // Activities for a given user
  return Activities.find({'createdById': userId});
});

Meteor.publish('residentActivities', function (residentId) {
  // Activities for a given user
  return Activities.find({'residentIds':  residentId });
});

Meteor.publish('residentLatestActivities', function () {
  // Get latest activity IDs
  var latestActivityIds = Meteor.call('getLatestActivityIds');

  // Get activities from Activities collection
  var activities = Activities.find({_id: {$in: latestActivityIds}});

  // Get cursor to latest activities
  return activities;
});
