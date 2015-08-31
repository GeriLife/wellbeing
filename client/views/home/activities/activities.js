Template.homeActivities.created = function () {
  // Create reference to template instance
  var instance = this;

  // Get the home id from data context
  instance.homeId = Router.current().params.homeId;

  // Create activities reactive variable
  instance.activities = new ReactiveVar();

  Meteor.call('getHomeActivities', instance.homeId, function (error, activities) {
    // Update the activities reactive variable
    instance.activities.set(activities);
  });
};

Template.homeActivities.helpers({
  homeActivities: function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get all activities, from template subscription
    var activities = instance.activities.get();

    return activities;
  },
  tableSettings: function () {
    var tableSettings = {
      showFilter: false,
      fields: [
        {
          key: 'residents',
          label: 'Residents',
          sortOrder:2,
          sortDirection: 'ascending'
        },
        {
          key: 'type',
          label: 'Activity Type',
          sortOrder: 1,
          sortDirection: 'ascending'
        },
        {
          key: 'duration',
          label: 'Duration'
        },
        {
          key: 'activityDate',
          label: 'Activity Date',
          tmpl: Template.dateCell,
          sortOrder: 0,
          sortDirection: 'descending'
        },
      ]
    };

    return tableSettings;
  }
});
