Residencies = new Mongo.Collection('residencies');

var ResidenciesSchema = new SimpleSchema({
  residentId: {
    type: String,
    autoform: {
      options: function() {
        // Get all residents
        const residents = Residents.find({}, {sort: {firstName: 1, lastInitial: 1}}).fetch();

        // create options list for select
        residentOptions = _.map(residents, function (resident) {
          // Create option for this resident, with ID as the value
          return {label: resident.fullName(), value: resident._id};
        });

        return residentOptions;
      },
    }
  },
  homeId: {
    type: String,
    autoform: {
      options: function() {
        // Get all Groups
        var groups = Groups.find().fetch();

        // Create an array of Group IDs
        var groupIDs = _.map(groups, function (group) {
          return group._id;
        });

        // Create select options for Homes input
        // Grouping homes by group
        var homeSelectOptions = _.map(groupIDs, function (groupId) {
          // Find the name of this group
          var groupName = Groups.findOne(groupId).name;

          // Get all homes of this group
          var groupHomes = Homes.find({groupId: groupId}).fetch();

          // Create a homes array with name/ID pairs for label/value
          var homesOptions = _.map(groupHomes, function (groupHome) {
            // Combine resident first name and last initial
            var homeName = groupHome.name;

            // Create option for this home, with home ID as the value
            return {label: homeName, value: groupHome._id};
          });

          // Return residents and home as option group
          return {optgroup: groupName, options: homesOptions};
        });

        return homeSelectOptions;
      }
    }
  },
  moveIn: {
    type: Date,
    autoValue: function () {
      if (this.isSet) {
        // Get move in date from form
        const moveInDate = new Date(this.value);

        // set move in to midnight UTC
        moveInDate.setUTCHours(0,0,0,0);

        return moveInDate;
      }
    },
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    },
  },
  moveOut: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isSet) {
        // Get move out date from form
        const moveOutDate = new Date(this.value);

        if (moveOutDate) {
          // set move out to midnight UTC
          moveOutDate.setUTCHours(0,0,0,0);

          return moveOutDate;
        }
      }
    },
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    },
  },
});

// Add i18n tags
ResidenciesSchema.i18n("residencies");

Residencies.attachSchema(ResidenciesSchema);

Residencies.allow({
  'insert': function () {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for insert privilege check
    let userCanInsert;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanInsert = (userId && userIsAdministrator);

    return userCanInsert;
  },
  'update': function () {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for update privilege check
    let userCanUpdate;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanUpdate = (userId && userIsAdministrator);

    return userCanUpdate;
  },
  'remove': function () {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for insert privilege check
    let userCanRemove;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanRemove = (userId && userIsAdministrator);

    return userCanRemove;
  }
});
