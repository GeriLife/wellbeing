Template.activityForm.created = function () {
  this.subscribe('allCurrentResidents');
  this.subscribe('allCurrentResidencies');
  this.subscribe('allHomes');
  this.subscribe('allActivityTypes');
  this.subscribe('allRolesExceptAdmin');
};

Template.activityForm.helpers({
  activityTypeIdOptions: function() {
    // Get all activity types from db
    var activityTypes = ActivityTypes.find().fetch();

    // Create an options array of activity types with label and value pairs
    var activityTypesOptions = _.map(activityTypes, function(activityType) {
      return {
        label: activityType.name,
        value: activityType._id
      };
    });

    return activityTypesOptions;
  },
  facilitatorRoleIdOptions () {
    // Get all roles, except admin, from db
    var roles = Meteor.roles.find({name: {$not: "admin"}}).fetch();

    // Create an options array of roles with label (name) and value (id) pairs
    var rolesOptions = _.map(roles, function(role) {
      // Don't return the admin role
      // Return role name and ID object
      return {
        label: role.name,
        value: role._id
      };
    });

    return rolesOptions;
  },
  formType () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Check if current activity is available
    if (templateInstance.data && templateInstance.data.activity) {
      // form type is 'update'
      return 'update';
    }

    // Default form type is 'insert'
    return 'insert';
  },
  residentsSelectOptions () {
    // Get list of homes, sorted alphabetically
    const homes = Homes.find({}, {sort: {name: 1}}).fetch();

    // Create an array residents grouped by home
    const residentsSelectOptions = _.map(homes, function (home) {
      // Get home ID
      const homeId = home._id;

      // do not show residents who are on hiatus
      const onHiatus = false;

      // Sort by first name in alphabetical order
      const sort = {firstName: 1}

      // Get a list of residents for current home
      const homeResidencies = Residencies.find({
          homeId,
          moveOut: {$exists: false},
        },
        {sort}
      ).fetch();

      const homeResidentIds = _.map(homeResidencies, function(residency) {
        return residency.residentId;
      });

      // Create an object containing a home and its residents
      const homeGroup = {
        optgroup: home.name,
        options: _.map(homeResidentIds, function (residentId) {
          const resident = Residents.findOne(residentId);

          // Create an object containing the resident name and ID
          const residentObject = {
            value: residentId,
            label: resident.fullName()
          };

          return residentObject;
       })
      }

      return homeGroup;
    });

    return residentsSelectOptions;
  }
});
