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
  getResidentRecentActiveDays (residentId, date = new Date()) {
    const recentActiveDays = [];

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

      recentActiveDays.push({residentWasActive});
    }

    return recentActiveDays;
  },
  getResidentRecentActiveDaysCount (residentId, date = new Date()) {
    /*
    Get count of recent days (within past seven days) where resident was active
    */

    // Initialize counter for resident active days
    let activeDaysCount = 0;

    const recentActiveDays = Meteor.call('getResidentRecentActiveDays', residentId, date);

    // each value in recent active days is boolean
    // true/false based on whether resident was active
    recentActiveDays.forEach(function (day) {
      if (day.residentWasActive) {
        // Add one to active days count
        activeDaysCount += 1;
      }
    })

    return activeDaysCount;
  },
  getResidentRecentActiveDaysAndCount (residentId, date = new Date()) {
    const residentRecentActiveDaysAndCount = {};

    const recentActiveDays = Meteor.call('getResidentRecentActiveDays', residentId, date);

    // active days are recent active days that are 'true',
    // meaning resident was active
    // https://stackoverflow.com/a/42317235/1191545
    const activeDaysCount = recentActiveDays.filter(day => day.residentWasActive === true).length;

    return {
      recentActiveDays,
      activeDaysCount,
    }
  }
});
