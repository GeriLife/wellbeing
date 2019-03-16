import SimpleSchema from "simpl-schema";

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
