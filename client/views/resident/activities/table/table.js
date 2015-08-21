Template.activityTable.helpers({
  'activities': function () {
    // Get Resident ID from router
    var residentId = Router.current().params.residentId;

    // Get resident activities
    var activities = Activities.find({residentIds: residentId}).fetch();

    var activitiesArray = [];

    activities.forEach(function (activity) {
      // Create temporary object to get Activity values
      var activityObject = {
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
    var tableSettings = {
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
