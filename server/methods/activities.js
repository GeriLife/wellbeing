Meteor.methods({
  'getResidentLatestActivityByType': function (residentId, activityTypeId) {
    /*
    Get the resident's most recent activity by type
    */
    var query = {
      activityTypeId: activityTypeId,
      residentIds: residentId
    };

    // Set up sort by activity date, in descending order
    var sort = {sort: {activityDate: -1}};

    // Get resident latest activity by type
    var residentsLatestActivityIdsByType = Activities.findOne(query, sort);

    // Return activity, if exists
    if (residentLatestActivityByType) {
      return residentLatestActivityByType;
    }
  },
  'getAllResidentsLatestActivityIdsByType': function (activityTypeId) {
    // Get all resident IDs
    var residentIds = Meteor.call('getAllResidentIds');

    // Placeholder for residents latest activity IDs
    var residentsLatestActivityIdsByType = [];

    // Loop through all resident IDs
    residentIds.forEach(function (residentId) {
      // Return resident latest activity
      var residentLatestActivity = Meteor.call('getResidentLatestActivityByType', residentId, activityTypeId);

      // If resident activity exists
      if (residentLatestActivity !== undefined) {
        // Get the ID of the Resident Latest activity
        var residentLatestActivityId = residentLatestActivity._id;

        // Add resident latest activity ID to residents latest activity IDs array
        residentsLatestActivityIdsByType.push(residentLatestActivityId);
      }
    })

    if (residentsLatestActivityIdsByType) {
      // Return the array of Resident Activity IDs
      return residentsLatestActivityIdsByType;
    }
  }
});
