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

Meteor.publish('homeActivities', function (homeId) {
  // Get all resident of this home
  var homeResidentIds = Meteor.call('getHomeResidentIds', homeId);

  // Get an array of all activity Ids for residents of this home
  var homeResidentActivities = Activities.find({'residentIds': {$elemMatch: {$in: homeResidentIds}}}).fetch();

  // return all activities from activity IDs array
  return homeResidentActivities;
});
