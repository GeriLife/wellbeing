Template.activityTable.helpers({
  activities: function() {
    // Get resident activities
    const activities = Template.currentData().activities;

    return activities.map(function(activity) {
      // Create temporary object to get Activity values
      return {
        activityType: activity.activityTypeName,
        activityDate: activity.activityDate,
        duration: activity.duration,
        activityId: activity._id,
      };
    });
  },
  tableSettings: function() {
    const activityTypeLabel = TAPi18n.__(
      'residentActivityTable-activityTypeLabel'
    );
    const durationLabel = TAPi18n.__(
      'residentActivityTable-durationLabel'
    );
    const activityDateLabel = TAPi18n.__(
      'residentActivityTable-activityDateLabel'
    );

    const tableSettings = {
      showFilter: false,
      fields: [
        {
          key: 'activityType',
          label: activityTypeLabel,
          sortOrder: 1,
          sortDirection: 'ascending',
        },
        {
          key: 'duration',
          label: durationLabel,
        },
        {
          key: 'activityDate',
          label: activityDateLabel,
          tmpl: Template.activityDateCell,
          sortOrder: 0,
          sortDirection: 'descending',
        },
      ],
      filters: ['activityTypeFilter'],
    };

    return tableSettings;
  },
});
