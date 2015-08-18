Template.latestActivitiesByTypeTable.helpers({
  residentsLatestActivities: function () {
    // Get resident activity details from template
    var residentsLatestActivities = instance.residentLatestActivityDetails.get();

    return residentsLatestActivities;
  }
});

Template.latestActivitiesByTypeTable.created = function () {
  // Set instance variable for consistency
  instance = Template.instance();

  instance.residentLatestActivityDetails = new ReactiveVar();

  instance.autorun(function () {
    // Keep track of the selected activity type
    var activityTypeId = instance.parent().activityTypeSelection.get();

    if (activityTypeId) {
      Meteor.call(
        'getResidentsNameHomeAndLastActivityByType',
        activityTypeId,
        function (error, residentLatestActivity) {
          if (error) {
            console.log(error);
          } else {
            instance.residentLatestActivityDetails.set(residentLatestActivity);
          }
        });
      }
  });
};
