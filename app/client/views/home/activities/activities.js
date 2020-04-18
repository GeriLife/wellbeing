Template.homeActivities.onCreated(function () {
  // Create reference to template instance
  const templateInstance = this;

  // Get the home ID from data context
  const homeId = Router.current().params.homeId;

  // Create activities reactive variable
  templateInstance.activities = new ReactiveVar(null);

  Meteor.call('getHomeActivities', homeId, function (error, activities) {
    // Update the activities reactive variable
    templateInstance.activities.set(activities);
  });
});

Template.homeActivities.helpers({
  homeActivities: function () {
    return Template.instance().activities.get();
  },

  tableSettings: function () {
    const tableSettings = {
      showFilter: false,
      fields: [
        {
          key: 'residents',
          label: TAPi18n.__('activities.residentIds.label'),
          sortOrder:2,
          sortDirection: 'ascending'
        },
        {
          key: 'type',
          label: TAPi18n.__('activities.activityTypeId.label'),
          sortOrder: 1,
          sortDirection: 'ascending'
        },
        {
          key: 'duration',
          label: TAPi18n.__('activities.duration.label')
        },
        {
          key: 'activityDate',
          label: TAPi18n.__('activities.activityDate.label'),
          tmpl: Template.activityDateCell,
          sortOrder: 0,
          sortDirection: 'descending'
        },
      ]
    };

    return tableSettings;
  }
});
