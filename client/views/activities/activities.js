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
};

Template.activities.events({
  'click #add-activity': function () {
    // Show the add activity modal
    Modal.show('newActivity');
  }
});

Template.activities.helpers({
  // "activities": function () {
  //   // Query Activities collection for all activities
  //   var activities = Activities.find().fetch();
  //
  //   // Create a placeholder array for resident objects
  //   var activitiesArray = [];
  //
  //   // Iterate through activities
  //   activities.forEach(function (activity) {
  //     // Get all resident IDs
  //     var residentIds = activity.residentIds;
  //
  //     // Placeholder for resident names
  //     var homeNames = _.map(residentIds, function (residentId) {
  //       // Get the resident
  //       var resident = Residents.findOne(residentId);
  //
  //       // Get resident home name
  //       var homeName = resident.homeName();
  //
  //       return homeName;
  //     });
  //
  //     // Get only unique home names
  //     var homeNamesUnique = _.uniq(homeNames);
  //
  //     // set resident names, type, duration, and date values
  //     var activityObject = {
  //       activityId: activity._id,
  //       residents: activity.residentNames(),
  //       type: activity.activityType(),
  //       duration: activity.duration,
  //       activityDate: activity.activityDate,
  //       homeNames: homeNamesUnique
  //     };
  //
  //     // Add activity object to residents list
  //     activitiesArray.push(activityObject);
  //   });
  //
  //   return activitiesArray;
  // },
  'tableSettings': function () {
    var tableSettings = {
      showFilter: false,
      filters: ['residentFilter', 'typeFilter'],
      fields: [
        {
          key: 'residents',
          label: 'Resident(s)',
          tmpl: Template.activitiesTableResidentsCell,
        },
        {
          key: 'type',
          label: 'Activity Type',
          sortOrder: 2,
          sortDirection: 'ascending',
          tmpl: Template.activitiesTableActivityTypeCell,
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
        },
        {
          key: '_id',
          label: "",
          tmpl: Template.manageActivityButtons,
          hidden: function () {
            var currentUserId = Meteor.userId();

            // Check if current user has Admin role
            var currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

            // Only show edit column for users with Admin role
            if (currentUserIsAdmin) {
              return false;
            } else {
              return true;
            }
          }
        }
      ],
    };

    return tableSettings;
  },
  'residentFilterFields': function () {
    return ['residentIds'];
  },
  "residentFilterLabel": function () {
    // Get internationalized resident filter string
    return TAPi18n.__("activities-filterActivities-residentFilterLabel");
  },
  'homeFilterFields': function () {
    return ['homeNames'];
  },
  "homeFilterLabel": function () {
    // Get internationalized resident filter string
    return TAPi18n.__("activities-filterActivities-homeFilterLabel");
  },
  'activityTypeFilterFields': function () {
    return ['type'];
  },
  "activityTypeFilterLabel": function () {
    // Get internationalized resident filter string
    return TAPi18n.__("activities-filterActivities-activityTypeFilterLabel");
  },
});
