Template.latestActivitiesByTypeTable.helpers({
  residentsLatestActivities: function () {
    // Get resident activity details from template
    var residentsLatestActivities = instance.residentLatestActivityDetails.get();

    return residentsLatestActivities;
  },
  tableSettings: function () {
    var tableSettings = {
      showFilter: false,
      fields: [
        {key: 'residentName', label: 'Resident Name'},
        {key: 'homeName', label: 'Home Name'},
        {key: 'latestActivityDate', label: 'Latest Activity Date', tmpl: Template.dateCell},
      ]
    };

    return tableSettings;
  }
});

Template.latestActivitiesByTypeTable.created = function () {
  // Set instance variable for consistency
  instance = this;

  instance.residentLatestActivityDetails = new ReactiveVar();

  instance.autorun(function () {
    // Keep track of the selected activity type
    var activityTypeId = instance.parent().activityTypeSelection.get();

    if (activityTypeId) {
      Meteor.call('getResidentsNameHomeAndLatestActivityByType',activityTypeId,function(error,residentLatestActivity) {
        instance.residentLatestActivityDetails.set(residentLatestActivity);
      });
    }
  });
};
