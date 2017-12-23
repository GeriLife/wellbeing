import SimpleSchema from 'simpl-schema';

var RolesSchema = new SimpleSchema({
  name: {
    type: String
  }
});

// Add i18n tags
// RolesSchema.i18n("roles");

Meteor.roles.attachSchema(RolesSchema);

Meteor.roles.allow({
  "insert": function (userId) {
    // Only Administrators can insert
    return Roles.userIsInRole(userId, ['admin']);
  }
});
