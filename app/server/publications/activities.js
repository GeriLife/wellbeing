Meteor.publish('allActivities', function () {
  return Activities.find();
});

ReactiveTable.publish('allActivities-paginated', Activities);

Meteor.publish('singleActivity', function (activityId) {
  return Activities.find(activityId);
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

Meteor.publish('residentActivityCountOnDate', function (residentId, date) {
  // Get start and end of day, for MongoDB query
  const startOfDay = moment(date).startOf('day');
  const endOfDay = moment(date).endOf('day');

  // Query activities for resident during entire day
  const query = {
    residentId,
    activityDate: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  };

  Counts.publish(this, 'residentActivityCountOnDate', Activities.find(query));
})
