Template.activities.created = function () {
  // Get reference to template instance
  var instance = this;

  instance.showLatestActivities = new ReactiveVar();

  // Get reference to template instance
  var instance = this;

  // Instance subscriptions
  // Activity types, residents, and homes
  instance.subscribe('allActivityTypes');
  instance.subscribe('allResidents');
  instance.subscribe('allHomes');

  // subscribe to all activities and related collections
  instance.autorun(function () {
    // Get the value of show latest activities toggle
    var showLatestActivities = instance.showLatestActivities.get();

    if (showLatestActivities === true) {
      instance.subscribe("residentLatestActivities");
    } else if (showLatestActivities === false){
      instance.subscribe("allActivities");
    }
  });
};

Template.activities.rendered = function () {
  // Get reference to template instance
  var instance = this;

  // Set options for toggle switch
  var options = {secondaryColor: 'silver'};
  instance.allOrLatestToggle = document.querySelector("[name='all-or-latest']");
  instance.switch = new Switchery(instance.allOrLatestToggle, options);

  // Get the value of latest activities toggle
  var allOrLatestToggle = instance.allOrLatestToggle.checked;

  // Set the value of show latest activities reactive variable
  instance.showLatestActivities.set(allOrLatestToggle);
};

Template.activities.events({
  "change [name='all-or-latest']": function (event, template) {
    // Get reference to template instance
    var instance = Template.instance();

    // Set reactive variable with value of all-or-latest toggle
    instance.showLatestActivities.set(instance.allOrLatestToggle.checked);
  },
  'click #add-activity': function () {
    // Show the add activity modal
    Modal.show('newActivity');
  }
});

Template.activities.helpers({
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
      filters: ['residentFilter', 'homeFilter', 'typeFilter'],
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
  },
  'residentFilterFields': function () {
    return ['residents'];
  },
  'homeFilterFields': function () {
    return ['homeNames'];
  },
  'activityTypeFilterFields': function () {
    return ['type'];
  }
});
