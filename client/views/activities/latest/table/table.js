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
        {
          key: 'residentName',
          label: 'Resident Name',
          sortOrder:2,
          sortDirection: 'ascending'
        },
        {
          key: 'homeName',
          label: 'Home Name',
          sortOrder: 1,
          sortDirection: 'ascending'
        },
        {
          key: 'latestActivityDate',
          label: 'Latest Activity Date',
          tmpl: Template.dateCell,
          sortOrder: 0,
          sortDirection: 'descending'
        },
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
