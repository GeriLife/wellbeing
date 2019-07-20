Template.activities.onCreated(function() {
  // Get reference to template instance
  const instance = this;

  // Instance subscriptions
  // Activity types, residents, and homes
  instance.subscribe('allActivityTypes');

  // Subscribe to user-visible residents and homes
  this.subscribe('currentUserVisibleResidents');
  this.subscribe('currentUserVisibleHomes');

  instance.currentPageOfActivities = new ReactiveVar([]);
  instance.rowsPerPage = new ReactiveVar(10);
  instance.currentPage = new ReactiveVar(1);
  instance.totalRows = new ReactiveVar(0);

  this.autorun(function() {
    const activityDeleted = Session.get('activity-deleted');
    const activityEdited = Session.get('activity-edited');
    const currentPage = instance.currentPage.get();
    const rowsPerPage = instance.rowsPerPage.get();
    if (activityDeleted === true || activityEdited===true) {
      onChange(instance, rowsPerPage, currentPage);
      Session.set('activity-deleted', false);
      Session.set('activity-edited', false);
    }
  });
});

Template.activities.events({
  'click #add-activity'() {
    // Show the add activity modal
    Session.set('reset-pagination', true);
    Modal.show('activityFormModal');
  },
  'click #clear-filters'(event, templateInstance) {
    // Clear value for all selectpickers
    $('#resident-filter').val(undefined);
    $('#activity-type-filter').val(undefined);

    // Trigger change event to refresh table
    $('select').trigger('change');
    Session.set('reset-pagination', true);
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
            return !currentUserIsAdmin;
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
    return (rowsPerPage, currentPage) =>
      onChange(activitiesTemplate, rowsPerPage, currentPage);
  },
  totalRows() {
    return Template.instance().totalRows.get();
  },
});

function onChange(activitiesTemplate, rowsPerPage, currentPage) {
  rowsPerPage = !rowsPerPage ? 10 : rowsPerPage;
  currentPage = !currentPage ? 1 : currentPage;
  // if inputs not proper
  if (currentPage <= 0 || rowsPerPage <= 0) return;

  const residentId = $('#resident-filter').val();
  const activityTypeId = $('#activity-type-filter').val();
  // Fetch rows for current page
  Meteor.call(
    'allUserVisibleActivities-paginated',
    { currentPage, rowsPerPage, activityTypeId, residentId },
    function(err, currentPageDetails) {
      if (!err) {
        const { rows, count } = currentPageDetails;
        // Set to current array list
        activitiesTemplate.currentPageOfActivities.set(rows);
        activitiesTemplate.totalRows.set(count);
        activitiesTemplate.rowsPerPage.set(rowsPerPage);
        activitiesTemplate.currentPage.set(currentPage);
      }
    }
  );
}
