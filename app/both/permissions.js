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
