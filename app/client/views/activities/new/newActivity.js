import 'select2';
import 'select2/dist/css/select2.css';

Template.newActivity.created = function () {
  this.subscribe('allCurrentResidents');
  this.subscribe('allHomes');
  this.subscribe('allActivityTypes');
  this.subscribe('allRolesExceptAdmin');
};

Template.newActivity.helpers({
  select2Options () {
    // Get placeholder text localization
    const placeholderText = TAPi18n.__('newActivity-residentSelect-placeholder');

    const options = {
      closeOnSelect: false,
      placeholder: placeholderText,
    };

    return options;
  },
  'today': function () {
    // Default date today, as a string
    return Date();
  },
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
  residentIdOptions () {
    // Get list of homes, sorted alphabetically
    const homes = Homes.find({}, {sort: {name: 1}}).fetch();

    // Create an array residents grouped by home
    const residentsSelectOptions = _.map(homes, function (home) {
      // Get home ID
      const homeId = home._id;

      // do not show departed residents
      const departed = false;

      // do not show residents who are on hiatus
      const onHiatus = false;

      // Sort by first name in alphabetical order
      const sort = {firstName: 1}

      // Get a list of residents for current home
      const homeResidents = Residents.find({ homeId, departed, onHiatus }, {sort}).fetch();

      // Create an object containing a home and its residents
      const homeGroup = {
        optgroup: home.name,
        options: _.map(homeResidents, function (resident) {
          // Create an object containing the resident name and ID
          const residentObject = {
            value: resident._id,
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
