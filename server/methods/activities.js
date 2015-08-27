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
    var residentLatestActivityByType = Activities.findOne(query, sort);

    // Return activity, if exists
    if (residentLatestActivityByType) {
      return residentLatestActivityByType;
    }
  },
   'getAllResidentsLatestActivityIdsByType': function () {
    /*
    Return an array of Activity IDs
    where each activity type has at most one entry per resident
    containing the most recent activity of that type/resident
    */
    // Get all resident IDs
    var residentIds = Meteor.call('getAllResidentIds');

    // Get all Activity Type IDs
    var activityTypeIds = Meteor.call('getAllActivityTypeIds');

    // Placeholder for residents latest activity
    var residentsLatestActivityIdsByType = [];

    // Iterate through resident IDs
    residentIds.forEach(function (residentId) {
      // for each resident ID
      // Iterate through activity types
      activityTypeIds.forEach(function (activityTypeId) {
        // Get a reference to Resident ID (as array-like object apparently)
        var residentIdObject = this;

        // Convert the resident ID array-like object to an array
        var residentIdArray = Array.prototype.slice.call(residentIdObject);

        // Convert the resident ID array to a string
        var residentId = residentIdArray.join("");

        // TODO: see if there is a simple way to accept a callback argument as string

        // for each activity type,
        // get resident latest activity
        var residentLatestActivityIdByType = Meteor.call('getResidentLatestActivityByType', residentId, activityTypeId);

        // append activity ID to residentsLatestActivityIdsByType
        residentsLatestActivityIdsByType.push(residentLatestActivityIdByType._id);
      }, residentId);
    });

    return residentsLatestActivityIdsByType
  }
});
