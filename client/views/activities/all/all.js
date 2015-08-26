Template.allActivities.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to all activities and related collections
  instance.subscribe("activitiesComposite");
};

Template.allActivities.helpers({
  "activities": function () {
    // Query Activities collection for all activities
    var activities = Activities.find().fetch();

    // Create a placeholder array for resident objects
    var activitiesArray = [];

    // Iterate through activities
    activities.forEach(function (activity) {
      // Get all resident IDs
      var residentIds = activity.residentIds;

      // Placeholder for resident names
      var homeNames = _.map(residentIds, function (residentId) {
        // Get the resident
        var resident = Residents.findOne(residentId);

        // Get resident home name
        var homeName = resident.homeName();

        return homeName;
      });

      // Get only unique home names
      var homeNamesUnique = _.uniq(homeNames);

      // set resident names, type, duration, and date values
      var activityObject = {
        residents: activity.residentNames(),
        type: activity.activityType(),
        duration: activity.duration,
        activityDate: activity.activityDate,
        homeNames: homeNamesUnique
      };

      // Add activity object to residents list
      activitiesArray.push(activityObject);
    });

    return activitiesArray;
  },
  'tableSettings': function () {
    var tableSettings = {
      showFilter: false,
      filters: ['residentFilter', 'typeFilter'],
      fields: [
        {
          key: 'residents',
          label: 'Resident(s)',
          sortOrder: 1,
          sortDirection: 'ascending'
        },
        {
          key: 'homeNames',
          label: 'Resident(s) Home(s)',
          sortOrder: 2,
          sortDirection: 'ascending'
        },
        {
          key: 'type',
          label: 'Activity Type',
          sortOrder: 2,
          sortDirection: 'ascending'
        },
        {
          key: 'duration',
          label: 'Duration',
        },
        {
          key: 'activityDate',
          label: 'Activity Date',
          sortOrder: 0,
          sortDirection: 'descending',
          tmpl: Template.dateCell,
        }
      ],
    };

    return tableSettings;
  }
});
