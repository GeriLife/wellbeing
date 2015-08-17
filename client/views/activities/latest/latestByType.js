Template.latestActivitiesByType.created = function () {
  // Create 'instance' variable for use througout template logic
  var instance = this;

  // Create variable to hold activity type selection
  instance.activityTypeSelection = new ReactiveVar();

  // Create latest resident activity placeholder
  instance.latestResidentsActivityByType = new ReactiveVar();

  instance.autorun(function () {
    // Get activity type selection
    var activityTypeSelection = instance.activityTypeSelection.get();

    if (activityTypeSelection) {
      // Get latest resident activities for selected activity type
      Meteor.call(
        'getResidentsLatestActivityByType',
        activityTypeSelection,
        function (error, latestActivity) {
          if (error) {
            console.log(error);
          } else {
            // Update the reactive variable with latest resident activity
            instance.latestResidentsActivityByType.set(latestActivity);
          }
        });
    };
  });

  instance.autorun(function () {
    var latestResidentActivities = instance.latestResidentsActivityByType.get();

    var residentIds = _.map(latestResidentActivities, function (residentActivity) {
      return residentActivity._id;
    });

    instance.subscribe('selectResidents', residentIds);
  });
};
