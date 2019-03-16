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
