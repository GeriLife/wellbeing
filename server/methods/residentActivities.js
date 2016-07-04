Meteor.methods({
  'getResidentRecentActivitiesCount': function (residentId) {
    // Date one week ago
    var oneWeekAgo = moment().subtract(1, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get a count of all resident activities within the desired time range
    var activityCount = Activities.find({
      'residentIds': residentId,
      activityDate: {$gte: oneWeekAgo, $lte: now}
    }).count();

    return activityCount;
  },
  'getResidentRecentActivityMinutes': function (residentId) {
    // Placeholder for activity minutes sum
    var activityMinutes = 0;

    // Date one week ago
    var oneWeeksAgo = moment().subtract(1, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    var activities = Activities.find({'residentIds': residentId, activityDate: {$gte: oneWeekAgo, $lte: now}});

    // Add each activity duration to the total activity minutes
    activities.forEach(function (activity) {
      activityMinutes += activity.duration;
    });

    return activityMinutes;
  },
  'getResidentWeeklyActivitiesCountFromDate': function (residentId, date) {
    // Date to start activity range query
    var start = moment(date).subtract(1, "weeks").toDate();
    //console.log(start);
    // Date to end activity range query
    var end = new moment(date).toDate();
    //console.log(end);

    // Get a count of all resident activities within the desired time range
    var activityCount = Activities.find({
      'residentIds': residentId,
      activityDate: {$gte: start, $lte: end}
    }).count();

    return activityCount;
  }
});
