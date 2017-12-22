Residents = new Mongo.Collection('residents');

var ResidentsSchema = new SimpleSchema({
  firstName: {
    type: String
  },
  lastInitial: {
    type: String,
    max: 1,
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

            // Create option for this resident, with ID as the value
            return {label: homeName, value: groupHome._id};
          });

          // Return residents and home as option group
          return {optgroup: groupName, options: homesOptions};
        });

        return homeSelectOptions;
      }
    }
  },
  interestsDescription: {
    type: String,
    optional: true,
    autoform: {
      type: 'textarea'
    }
  },
  onHiatus: {
    type: Boolean,
    defaultValue: false
  },
  departed: {
    type: Boolean,
    optional: true,
    defaultValue: false
  }
});

// Add i18n tags
ResidentsSchema.i18n("residents");

Residents.attachSchema(ResidentsSchema);

Residents.helpers({
  fullName: function () {
    // First name and last initial
    var firstName = this.firstName;
    var lastInitial = this.lastInitial;

    if (firstName && lastInitial) {
      return firstName + " " + lastInitial;
    } else {
      return firstName;
    }

  },
  'activities': function () {
    // Get resident ID
    var residentId = this._id;

    // Get today's date
    var now = moment().toDate();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({'residentIds': residentId, activityDate: {$lte: now}}, {sort : {activityDate:  -1} });
  },
  'recentActivities': function () {
    // Get resident ID
    var residentId = this._id;

    // Date two weeks ago
    var twoWeeksAgo = moment().subtract(2, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({'residentIds': residentId, activityDate: {$gte: twoWeeksAgo, $lte: now}}, {sort : {activityDate:  -1} });
  },
  homeName: function () {
    var homeId = this.homeId;
    var home = Homes.findOne(homeId);
    return home.name;
  }
});

Residents.allow({
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
    /// Get user ID
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
