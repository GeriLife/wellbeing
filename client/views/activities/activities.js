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
  },
  'click #clear-filters' () {
    // Clear value for all selectpickers
    $('.selectpicker').selectpicker('val', null);

    // Trigger change event to refresh table
    $('.selectpicker').trigger('change');
  }
});

Template.activities.helpers({
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
});
