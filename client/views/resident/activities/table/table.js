Template.activityTable.helpers({
  'activities': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get resident activities
    const activities = instance.data.activities;

    const activitiesArray = [];

    activities.forEach(function (activity) {
      // Create temporary object to get Activity values
      const activityObject = {
        activityType: activity.activityType(),
        activityDate: activity.activityDate,
        duration: activity.duration
      };

      // Add Activity to activities list
      activitiesArray.push(activityObject);
    });

    return activitiesArray;
  },
  'tableSettings': function () {
    const tableSettings = {
      showFilter: false,
      fields: [
        {
          key: 'activityType',
          label: 'Activity Type',
          sortOrder:1,
          sortDirection: 'ascending'
        },
        {
          key: 'duration',
          label: 'Duration',
        },
        {
          key: 'activityDate',
          label: 'Activity Date',
          tmpl: Template.dateCell,
          sortOrder: 0,
          sortDirection: 'descending'
        },
      ],
      filters: ['activityTypeFilter']
    };

    return tableSettings;
  }
});
