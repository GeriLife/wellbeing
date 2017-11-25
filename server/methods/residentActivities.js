Meteor.methods({
  checkIfResidentWasActiveOnDate (residentId, date) {
    // Create morning and evening dates
    // in order to query activities for date
    const morning = new Date(date);
    morning.setHours(0);
    morning.setMinutes(0);
    morning.setSeconds(0);

    const evening = new Date(date);
    evening.setHours(23);
    evening.setMinutes(59);
    evening.setSeconds(59);

    // Check if resident has (at least one) recorded activity on that day (date)
    const residentActiveOnDate = Activities.findOne({
      // Make sure resident ID in resident IDs array
      residentIds: {
        $elemMatch: { $eq: residentId }
      },
      // Make sure activity recorded on desired date
      activityDate: {
        $gte: morning,
        $lte: evening,
      }
    });

    // Return the (boolean) value indicating whether resident was active on date
    // note: we make sure we got a document back by comparing against undefined
    return (residentActiveOnDate != undefined);
  },
  getResidentRecentActivitiesCount (residentId) {
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
  getResidentWeeklyActivitiesCountFromDate (residentId, date) {
    // Date to start activity range query
    var start = moment(date).subtract(1, "weeks").toDate();

    // Date to end activity range query
    var end = new moment(date).toDate();

    // Get a count of all resident activities within the desired time range
    var activityCount = Activities.find({
      'residentIds': residentId,
      activityDate: {$gte: start, $lte: end}
    }).count();

    return activityCount;
  }
});
