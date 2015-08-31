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
  }
});
