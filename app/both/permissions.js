import SimpleSchema from "simpl-schema";
import UserEventLog from "/both/collections/userEventLog";

Permissions = new Mongo.Collection("permissions");

const PermissionsSchema = new SimpleSchema({
  residentId: {
    type: String
  },
  groupId: {
    type: String
  }
});

Permissions.attachSchema(PermissionsSchema);

Meteor.startup(function() {
  if (Meteor.isServer) {
    // Make sure residentId field is indexed for performance
    Permissions._ensureIndex({ residentId: 1 });

    // Make sure groupId field is indexed for performance
    Permissions._ensureIndex({ groupId: 1 });
  }
});

Permissions.after.insert(function(userId, permission) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: "insert",
    entityType: "permission",
    entityId: permission._id
  });
});

Permissions.after.update(function(userId, permission) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: "update",
    entityType: "permission",
    entityId: permission._id
  });
});

Permissions.after.remove(function(userId, permission) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: "remove",
    entityType: "permission",
    entityId: permission._id
  });
});

Permissions.allow({
  insert: function() {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Check if current user has Admin role
    const currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

    // Only show edit column for users with Admin role
    if (currentUserIsAdmin) {
      return true;
    } else {
      return false;
    }
  },
  update: function() {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Check if current user has Admin role
    const currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

    // Only show edit column for users with Admin role
    if (currentUserIsAdmin) {
      return true;
    } else {
      return false;
    }
  },
  remove: function() {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Check if current user has Admin role
    const currentUserIsAdmin = Roles.userIsInRole(currentUserId, ["admin"]);

    // Only show edit column for users with Admin role
    if (currentUserIsAdmin) {
      return true;
    } else {
      return false;
    }
  }
});
