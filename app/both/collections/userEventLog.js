import SimpleSchema from 'simpl-schema';

export default UserEventLog = new Mongo.Collection('userEvents');

const UserEventLogSchema = new SimpleSchema({
  eventDate: {
    type: Date,
    optional: false,
    autoValue () {
      return new Date();
    },
  },
  userId: {
    type: String,
    // sometimes system events can generate data,
    // so user ID is optional
    optional: true,
  },
  action: {
    type: String,
    optional: false,
  },
  entityType: {
    type: String,
    optional: true,
  },
  entityId: {
    type: String,
    optional: true,
  },
});

UserEventLog.attachSchema(UserEventLogSchema);

UserEventLog.allow({
  insert: function () {
    // Make sure a user is signed in
    if (Meteor.userId()) {
      return true;
    }

    return false;
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
