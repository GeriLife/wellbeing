import moment from 'moment';

Meteor.methods({
  checkIfResidentWasActiveOnDate (residentId, date) {
    // Create morning and evening dates (Date objects)
    // in order to query activities for date
    const morning = moment(date).startOf('day').toDate();
    const evening = moment(date).endOf('day').toDate();

    // Count the number of activities recorded for the resident on the given date
    const residentActivityCountOnDate = Activities.find({
      // Make sure resident ID in resident IDs array
      residentIds: {
        $elemMatch: { $eq: residentId }
      },
      // Make sure activity recorded on desired date
      activityDate: {
        $gte: morning,
        $lte: evening,
      }
    }).count();

    // Return the (boolean) value indicating whether resident was active on date
    // note: we are checking that the activity count is greater than zero
    return (residentActivityCountOnDate > 0);
  },
  getResidentRecentActiveDaysCount (residentId, date = new Date()) {
    /*
    Get count of recent days (within past seven days) where resident was active
    */

    // Initialize counter for resident active days
    let activeDaysCount = 0;

    // Date one week ago (six days, since today counts as one day)
    const startDate = moment(date).subtract(6, 'days');

    // Get a date object for the end of day today
    const endDate = moment(date).endOf('day');

    // For each of the days in the past week,
    // check whether the user was active
    // increment 'active days' count for each active day
    for (let currentDay = moment(startDate); currentDay.isBefore(endDate); currentDay.add(1, 'day')) {
      // Check whether resident was active on current day
      const residentWasActive = Meteor.call('checkIfResidentWasActiveOnDate', residentId, currentDay.toDate());

      if (residentWasActive) {
        // Add one to active days count
        activeDaysCount += 1;
      }
    }

    return activeDaysCount;
  },
});
