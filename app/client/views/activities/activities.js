Template.activities.onCreated(function() {
  // Get reference to template instance
  const instance = this;

  instance.currentPageOfActivities = new ReactiveVar([]);
  instance.rowsPerPage = new ReactiveVar(10);
  instance.currentPage = new ReactiveVar(1);
  instance.totalRows = new ReactiveVar(0);

  this.autorun(function() {
    /*
    We initialise the component with default fields for pagination in the table. Also,
    some listeners for the sessions are created here. This is for actions column 
    in the table.
    * As pagination and table actions are maintained outside of the table, there was a
    need to refresh the table content after a crud operation. To do the same two events activity-deleted and activity-edited are added. 
    (Refer: https://github.com/aslagle/reactive-table#accessing-and-controlling-table-state)

    * Once any of the two events are fired, the onchange method is called, which updates
    the data rendered in table to be in sync with the database. After a CRUD operation this method
    is responsible for updating total number of rows, rows and row information present in current
    page. 
    */
    const activityDeleted = Session.get('activity-deleted');
    const activityEdited = Session.get('activity-edited');
    const currentPage = instance.currentPage.get();
    const rowsPerPage = instance.rowsPerPage.get();
    if (activityDeleted === true || activityEdited === true) {
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
    // Clear value for all select pickers
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
      fields: [
        {
          key: 'residents',
          sortable: false,
          label: TAPi18n.__('activities.residentIds.label'),
          tmpl: Template.activitiesTableResidentsCell,
        },
        {
          key: 'type',
          sortable: false,
          label: TAPi18n.__('activities.activityTypeId.label'),
          sortOrder: 2,
          sortDirection: 'ascending',
          tmpl: Template.activitiesTableActivityTypeCell,
        },
        {
          key: 'duration',
          sortable: false,
          label: TAPi18n.__('activities.duration.label'),
        },
        {
          key: 'activityDate',
          sortable: false,
          label: TAPi18n.__('activities.activityDate.label'),
          tmpl: Template.activityDateCell,
        },
        {
          key: '_id',
          sortable: false,
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
  /* To preserve the current page and page size information */
  rowsPerPage = !rowsPerPage ? 10 : rowsPerPage;
  currentPage = !currentPage ? 1 : currentPage;

  // if inputs not proper
  if (currentPage <= 0 || rowsPerPage <= 0) return;

  /* Retrieves filters if any */
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
