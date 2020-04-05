Template.activityForm.onCreated(function() {
  const templateInstance = this;

  templateInstance.subscribe("allActivityTypes");
  templateInstance.subscribe("allRolesExceptAdmin");

  // placeholder for resident select options
  templateInstance.residentOptions = new ReactiveVar();

  Meteor.call("userVisibleResidentNamesGroupedtByHomes", function(
    error,
    residentSelectOptions
  ) {
    templateInstance.residentOptions.set(residentSelectOptions);
  });
});

Template.activityForm.helpers({
  activityTypeIdOptions: function() {
    // Get all activity types from db
    const activityTypes = ActivityTypes.find().fetch();

    // Create an options array of activity types with label and value pairs
    const activityTypesOptions = _.map(activityTypes, function(
      activityType
    ) {
      return {
        label: activityType.name,
        value: activityType._id,
      };
    });

    return activityTypesOptions;
  },
  facilitatorRoleIdOptions() {
    // Get all roles, except admin, from db
    const roles = Meteor.roles
      .find({ name: { $not: 'admin' } })
      .fetch();

    // Create an options array of roles with label (name) and value (id) pairs
    const rolesOptions = _.map(roles, function(role) {
      // Don't return the admin role
      // Return role name and ID object
      return {
        label: role.name,
        value: role._id,
      };
    });

    return rolesOptions;
  },
  formType() {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Check if current activity is available
    if (templateInstance.data && templateInstance.data.activity) {
      // form type is 'update'
      return 'method-update';
    }

    // Default form type is 'insert'
    return 'method';
  },
  residentsSelectOptions() {
    const templateInstance = Template.instance();

    return templateInstance.residentOptions.get();
  },
});

Template.activityForm.events({
  "click .btn-danger"() {
    FlashMessages.clear();
  }
})