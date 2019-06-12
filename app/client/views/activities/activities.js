Template.activities.onCreated(function() {
  // Get reference to template instance
  const instance = this;

  // Instance subscriptions
  // Activity types, residents, and homes
  instance.subscribe('allActivityTypes');

  // Subscribe to user-visible residents and homes
  this.subscribe('currentUserVisibleResidents');
  this.subscribe('currentUserVisibleResidents');
  this.subscribe('currentUserVisibleHomes');
  this.subscribe('allUserVisibleActivities-paginated');

  instance.currentPageOfActivities = new ReactiveVar([]);
  instance.rowsPerPage = new ReactiveVar(10);
});

Template.activities.events({
  'click #add-activity'() {
    // Show the add activity modal
    Modal.show('activityFormModal');
  },
  'click #clear-filters'() {
    // Clear value for all selectpickers
    $('#resident-filter').val(undefined);
    $('#activity-type-filter').val(undefined);

    // Trigger change event to refresh table
    $('select').trigger('change');
  },
});

Template.activities.helpers({
  tableSettings() {
    var tableSettings = {
      showFilter: false,
      rowsPerPage: Template.instance().rowsPerPage,
      showNavigation: 'never',
      filters: ['residentFilter', 'typeFilter'],
      data: {
        rows: Activities.find().count(),
      },
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
          tmpl: Template.activityDateCell,
        },
        {
          key: '_id',
          label: '',
          tmpl: Template.manageActivityButtons,
          hidden: function() {
            var currentUserId = Meteor.userId();

            // Check if current user has Admin role
            var currentUserIsAdmin = Roles.userIsInRole(
              currentUserId,
              ['admin']
            );

            // Only show edit column for users with Admin role
            if (currentUserIsAdmin) {
              return false;
            } else {
              return true;
            }
          },
        },
      ],
    };

    return tableSettings;
  },

  allUserVisibleActivities() {
    return Template.instance().currentPageOfActivities.get();
  },

  /* Set method a that is to be called from pagination template to fetch data */
  onChange() {
    const activitiesTemplate = Template.instance();
    return (rowsPerPage, currentPage) => {

      // if inputs not proper
      if (currentPage <= 0 || rowsPerPage <= 0) return;

      // Fetch rows for current page
      const currentPageOfActivities = Activities.find(
        {},
        {
          skip: (currentPage - 1) * rowsPerPage,
          limit: rowsPerPage,
        }
      ).fetch();

      activitiesTemplate.rowsPerPage.set(rowsPerPage);
      // Set to current array list
      activitiesTemplate.currentPageOfActivities.set(
        currentPageOfActivities
      );
    };
  },
  totalRows() {
    return Activities.find().count();
  },
});
