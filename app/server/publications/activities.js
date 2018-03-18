import moment from 'moment';

Meteor.publish('allActivities', function () {
  return Activities.find();
});

ReactiveTable.publish('allActivities-paginated', function () {
  if (this.userId) {
      return Activities;
    } else {
      return [];
    }
});

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
  const startOfDay = moment(date).startOf('day').toDate();
  const endOfDay = moment(date).endOf('day').toDate();

  // Query activities for resident during entire day
  const query = {
    residentIds: residentId,
    activityDate: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  };

  // Get cursor pointing to resident activities on given day
  const activitiesCursor = Activities.find(query);

  // Create ISO date string (YYYY-mm-dd) from date
  const isoYMD = moment(date).format('YYYY-mm-dd');

  // Create specific count publication for resident ID and activity date
  Counts.publish(this, `residentId-${ residentId }-activityCountOn-${ isoYMD }`, activitiesCursor);
})
