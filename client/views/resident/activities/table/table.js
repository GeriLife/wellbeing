Template.activityTable.helpers({
  'activities': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get resident activities
    const activities = Template.currentData().activities;

    const activitiesArray = [];

    activities.forEach(function (activity) {
      // Create temporary object to get Activity values
      const activityObject = {
        activityType: activity.activityType(),
        activityDate: activity.activityDate,
        duration: activity.duration,
        activityId: activity._id
      };

      // Add Activity to activities list
      activitiesArray.push(activityObject);
    });

    return activitiesArray;
  },
  'tableSettings': function () {
    const activityTypeLabel = TAPi18n.__("residentActivityTable-activityTypeLabel");
    const durationLabel = TAPi18n.__("residentActivityTable-durationLabel");
    const activityDateLabel = TAPi18n.__("residentActivityTable-activityDateLabel");

    const tableSettings = {
      showFilter: false,
      fields: [
        {
          key: 'activityType',
          label: activityTypeLabel,
          sortOrder:1,
          sortDirection: 'ascending'
        },
        {
          key: 'duration',
          label: durationLabel,
        },
        {
          key: 'activityDate',
          label: activityDateLabel,
          tmpl: Template.dateCell,
          sortOrder: 0,
          sortDirection: 'descending'
        },
        {
          key: '_id',
          label: "",
          tmpl: Template.editActivityButton,
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
      filters: ['activityTypeFilter']
    };

    return tableSettings;
  }
});
