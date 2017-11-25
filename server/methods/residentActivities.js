import moment from 'moment';

Meteor.methods({
  checkIfResidentWasActiveOnDate (residentId, date) {
    // Create morning and evening dates (Date objects)
    // in order to query activities for date
    const morning = moment(date).startOf('day').toDate();
    const evening = moment(date).endOf('day').toDate();

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
  getResidentRecentActiveDaysCount (residentId) {
    /*
    Get count of recent days (within past seven days) where resident was active
    */

    // Initialize counter for resident active days
    let activeDaysCount = 0;

    // Date one week ago
    const oneWeekAgo = moment().subtract(1, 'weeks');

    // Get a date object for the end of day today
    const endOfDayToday = moment().endOf('day');

    // For each of the days in the past week,
    // check whether the user was active
    // increment 'active days' count for each active day
    for (let currentDay = moment(oneWeekAgo); currentDay.isBefore(endOfDayToday); currentDay.add('days', 1)) {
      // Check whether resident was active on current day
      const residentWasActive = Meteor.call('checkIfResidentWasActiveOnDate', residentId, currentDay.toDate());

      if (residentWasActive) {
        // Add one to active days count
        activeDaysCount += 1;
      }
    }

    return activeDaysCount;
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
  },
});
