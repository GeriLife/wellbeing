Activities = new Mongo.Collection('activities');

var ActivitiesSchema = new SimpleSchema({
  residentIds: {
    type: [String],
    autoform: {
      options: function() {
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
    }
  },
  activityTypeId: {
    type: String,
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
    min: function () {
      // Only allow activities to be recorded for the past seven days
      return moment().subtract(7, "days").toDate();

    },
    max: function () {
      // Do not allow activity dates in the future
      return new Date();
    },
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  duration: {
    type: Number,
  },
  facilitatorRoleId: {
    type: String,
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

// Add i18n tags
ActivitiesSchema.i18n("activities");

// Attach schema to collection
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
  facilitatorRole: function () {
    // Get the facilitator Role ID
    var facilitatorRoleId = this.facilitatorRoleId;

    // Get Role from Roles collection, by ID
    var facilitatorRole = Meteor.roles.findOne(facilitatorRoleId);

    // Return the Role name
    return facilitatorRole.name;
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
  },
  update: function () {
    // Get current user ID
    var currentUserId = Meteor.userId();

    // Check if current user has Admin role
    var currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

    // Only show edit column for users with Admin role
    if (currentUserIsAdmin) {
      return true;
    } else {
      return false;
    }
  },
  remove: function () {
    // Get current user ID
    var currentUserId = Meteor.userId();

    // Check if current user has Admin role
    var currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

    // Only show edit column for users with Admin role
    if (currentUserIsAdmin) {
      return true;
    } else {
      return false;
    }
  }
});
