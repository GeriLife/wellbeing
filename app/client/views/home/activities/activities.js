Template.homeActivities.onCreated(function () {
  // Create reference to template instance
  const templateInstance = this;

  // Get the home ID from data context
  const homeId = Router.current().params.homeId;

  // Create activities reactive variable
  templateInstance.activities = new ReactiveVar();

  Meteor.call('getHomeActivities', homeId, function (error, activities) {
    // Update the activities reactive variable
    templateInstance.activities.set(activities);
  });
});

Template.homeActivities.helpers({
  homeActivities: function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get all activities, from template subscription
    const activities = instance.activities.get();

    // Return activities if available, otherwise return an empty array
    if (activities ) {
     return activities;
    } else {
      return [];
    }
  },
  tableSettings: function () {
    const tableSettings = {
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
          tmpl: Template.activityDateCell,
          sortOrder: 0,
          sortDirection: 'descending'
        },
      ]
    };

    return tableSettings;
  }
});
