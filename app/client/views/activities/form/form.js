Template.activityForm.onCreated(function () {
  const templateInstance = this;

  // placeholder for resident select options
  templateInstance.residentOptions = new ReactiveVar();
  templateInstance.roles = new ReactiveVar();
  templateInstance.activityTypes = new ReactiveVar();

  this.autorun(function () {
    Meteor.call('userVisibleResidentNamesGroupedtByHomes', function (
      error,
      residentSelectOptions
    ) {
      templateInstance.residentOptions.set(residentSelectOptions);
    });

    Meteor.call('getRolesExceptAdmin', function (err, roles) {
      if (!err) {
        templateInstance.roles.set(roles);
      }
    });

    Meteor.call('getAllActivityTypes', function (err, activityTypes) {
      if (!err) {
        templateInstance.activityTypes.set(activityTypes);
      }
    });
  });
});

Template.activityForm.helpers({
  activityTypeIdOptions: function () {
    const activityTypes = Template.instance().activityTypes.get();

    // Create an options array of activity types with label and value pairs
    const activityTypesOptions = _.map(activityTypes, function (
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
    const roles = Template.instance().roles.get();

    // Create an options array of roles with label (name) and value (id) pairs
    const rolesOptions = _.map(roles, function (role) {
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
  'click .btn-danger'() {
    FlashMessages.clear();
  },
});
