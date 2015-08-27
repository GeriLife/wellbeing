Meteor.methods({
  'getAllResidentsLatestActivitiesByType': function () {
    /*
    Return an array of Activity IDs
    where each activity type has at most one entry per resident
    containing the most recent activity of that type/resident
    */
    // Get all resident IDs
    var residentIds = Meteor.call('getAllResidentIds');

    // Get all Activity Type IDs
    var activityTypeIds = Meteor.call('getAllActivityTypeIds');

    // Iterate through resident IDs
    // for each resident ID
      // Iterate through activity types
      // foe each activity type,
          // get resident latest activity
          // append activity ID to residentsLatestActivityIdsByType

    // Placeholder for residents latest activity
    var residentsLatestActivityIdsByType = [];

    // return residentsLatestActivityIdsByType
  }
});
