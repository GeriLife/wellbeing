import moment from 'moment';

Meteor.methods({
  getAllResidentIds () {
    // TODO: determine how to secure this method to prevent client abuse

    // Get all residents
    const residents = Residents.find().fetch();

    // Create an array of resident IDs
    const residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    return residentIds;
  },
  getResidentActivitiesByType ({ residentId, activityTypeId, period }) {
    // Date period ago
    const activityPeriodStart = moment().subtract(period, "days").toDate();

    // Date today
    const now = new Date();

    // Get all activities of a specific type involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    const activities = Activities.find({
      'residentIds': residentId,
      'activityTypeId': activityTypeId,
      activityDate: {$gte: activityPeriodStart, $lte: now}},
      {sort : {activityDate:  -1}
    }).fetch();

    if (activities) {
      return activities;
    }
  },
  getCountOfResidentActivitiesByType ({ residentId, activityTypeId, period }) {
    const activities = Meteor.call('getResidentActivitiesByType', { residentId, activityTypeId, period });

    // Placeholder for sum of activities
    let activityCount = 0;

    if (activities) {
      // Count the resident activity
      activityCount = activities.length;
    }

    return activityCount;
  },
  getAllResidentSelectOptions () {
    /*
    return an array of resident objects in the form of:
       label: firstName lastInitial
       value: residentId
   */

   // Get all residents
   const residents = Residents.find().fetch();

   // Create array of resident select options
   const residentSelectOptions = _.map(residents, (resident) => {
     return {
       label: `${resident.firstName} ${resident.lastInitial}`,
       value: resident._id,
     }
   });

   return residentSelectOptions;
  },
  getMinutesOfResidentActivitiesByType ({ residentId, activityTypeId, period }) {
    // Date period ago
    const activityPeriodStart = moment().subtract(period, "days").toDate();

    // Date today
    const now = new Date();

    const residentActivities = Activities.find(
      {
        residentIds: residentId,
        activityTypeId: activityTypeId,
        activityDate: {$gte: activityPeriodStart, $lte: now}
        },
      {
        sort : { activityDate:  -1 }
      }).fetch();

    // Sum of duration for particular resident & activity
    return residentActivities.reduce((prevResult, document) => prevResult + document.duration, 0)
  }
});
