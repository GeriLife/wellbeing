Template.activities.onCreated(function() {
  // Get reference to template instance
  const instance = this;

  // Instance subscriptions
  // Activity types, residents, and homes
  instance.subscribe("allActivityTypes");

  // Subscribe to user-visible residents and homes
  this.subscribe("currentUserVisibleResidents");
  this.subscribe("currentUserVisibleResidents");
  this.subscribe("currentUserVisibleHomes");
  this.subscribe("allUserVisibleActivities-paginated");

  
});

Template.activities.events({
  "click #add-activity"() {
    // Show the add activity modal
    Modal.show("activityFormModal");
  },
  "click #clear-filters"() {
    // Clear value for all selectpickers
    $("#resident-filter").val(undefined);
    $("#activity-type-filter").val(undefined);

    // Trigger change event to refresh table
    $("select").trigger("change");
  }
});

Template.activities.helpers({
  tableSettings() {
    const currentPage = Template.instance().currentPage;
    var tableSettings = {
      showFilter: false,
      showNavigation:'never',
      filters: ["residentFilter", "typeFilter"],
      data: {
        rows: Activities.find().count()
      },
      fields: [
        {
          key: "residents",
          label: "Resident(s)",
          tmpl: Template.activitiesTableResidentsCell
        },
        {
          key: "type",
          label: "Activity Type",
          sortOrder: 2,
          sortDirection: "ascending",
          tmpl: Template.activitiesTableActivityTypeCell
        },
        {
          key: "duration",
          label: "Duration"
        },
        {
          key: "activityDate",
          label: "Activity Date",
          sortOrder: 0,
          sortDirection: "descending",
          tmpl: Template.activityDateCell
        },
        {
          key: "_id",
          label: "",
          tmpl: Template.manageActivityButtons,
          hidden: function() {
            var currentUserId = Meteor.userId();

            // Check if current user has Admin role
            var currentUserIsAdmin = Roles.userIsInRole(currentUserId, [
              "admin"
            ]);

            // Only show edit column for users with Admin role
            if (currentUserIsAdmin) {
              return false;
            } else {
              return true;
            }
          }
        }
      ]
    };

    return tableSettings;
  },
  

  allUserVisibleActivities() {
    const currentPage = 0;
    const dat = Activities.find({}, { skip: currentPage, limit: 10 }).fetch();
    console.log(this);
    return dat;
  }
});
