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
