Template.latestActivitiesByTypeTable.helpers({
  tableData: function () {
    // Get resident activity details from template
    var residentActivities = instance.residentDetails.get();

    if (residentActivities) {
      // Render resident details to the table
      // Columns resident name, timeAgo
      return residentActivities;
    } else {
      // return an empty array to simply render the table
      return [];
    }
  }
});

Template.latestActivitiesByTypeTable.created = function () {
  // Set instance variable for consistency
  instance = Template.instance();

  instance.residentDetails = new ReactiveVar();

  instance.autorun(function () {
    // Keep track of the selected activity type
    var residentActivities = instance.parent().latestResidentsActivityByType.get();

    var residentIds = _.map(residentActivities, function (residentActivity) {
      // Get the resident ID
      return residentActivity._id;
    });

    // Get residents from database
    instance.subscribe('selectResidents', residentIds);

    var residentNamesWithActivityDates = _.map(
      residentActivities,
      function (residentActivity) {
        // Get resident ID from activity
        var residentId = residentActivity._id;

        // Add activity date in 'time ago' format
        var activityTimeAgo = new moment(residentActivity.latestActivity).fromNow();

        // Get resident details from collection
        var resident = Residents.findOne(residentId);

        // Create an object with details
        var residentDetails = {
          firstName: resident.firstName,
          lastName: resident.lastName,
          lastActive: activityTimeAgo
        }

        return residentDetails;
    });

    instance.residentDetails.set(residentNamesWithActivityDates);
  });
};
