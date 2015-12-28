Activities = new Mongo.Collection('activities');

var ActivitiesSchema = new SimpleSchema({
  residentIds: {
    type: Array,
    label: 'Resident'
  },
  'residentIds.$': {
    type: String,
    autoform: {
      options: function() {
        // Get all Homes
        var homes = Homes.find().fetch();

        // Create an array of Home IDs
        var homeIDs = _.map(homes, function (home) {
          return home._id;
        });

        // Create select options for residents input
        // Grouping residents by home
        var residentSelectOptions = _.map(homeIDs, function (homeID) {
          // Find the name of this home
          var homeName = Homes.findOne(homeID).name;

          // Get all current residents of this home
          var homeResidents = Residents.find({
            homeId: homeID,
            departed: false
          }).fetch();

          // Create a residents array with name/ID pairs for label/value
          var residentOptions = _.map(homeResidents, function (homeResident) {
            // Combine resident first name and last initial
            var residentName = homeResident.firstName + ' ' + homeResident.lastInitial;

            // Create option for this resident, with ID as the value
            return {label: residentName, value: homeResident._id};
          });

          // Return residents and home as option group
          return {optgroup: homeName, options: residentOptions};
        });

        return residentSelectOptions;
      }
    }
  },
  activityTypeId: {
    type: String,
    label: 'Activity Type',
    autoform: {
      options: function() {
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
      }
    }
  },
  activityDate: {
    type: Date,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  duration: {
    type: Number,
    label: "Duration (in minutes)"
  },
  facilitatorRoleId: {
    type: String,
    label: "Facilitator role",
    autoform: {
      options: function() {
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
      }
    }
  }
});

Activities.attachSchema(ActivitiesSchema);

Activities.helpers({
  residentNames: function () {
    // Get the Resident ID;
    var residentIds = this.residentIds;

    // Get Resident(s) from Residents collection, by ID(s)
    var residents = Residents.find({'_id': {$in: residentIds}}).fetch();

    // Create an array of resident names
    var residentNamesArray = _.map(residents, function (resident) {
      return resident.firstName;
    });

    // Return the resident name(s), joining with ", "
    return residentNamesArray.join(", ");
  },
  activityType: function () {
    // Get the Activity Type ID
    var activityTypeId = this.activityTypeId;

    // Get Activity Type from Activity Types collection, by ID
    var activityType = ActivityTypes.findOne(activityTypeId);

    // Return the Activity Type name
    return activityType.name;
  },
  activityDateFormatted: function () {
    // Get activity date
    var activityDate = this.activityDate;

    // Format activity date
    var activityDateFormatted = moment(activityDate).format("D.M.YYYY");

    return activityDateFormatted;
  },
  timeAgo: function () {
    var activityDate = this.activityDate;

    var timeAgo = moment(activityDate).fromNow();

    return timeAgo;
  }
});

Activities.allow({
  insert: function () {
    return true;
  }
});
