var RolesSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  }
});

Meteor.roles.attachSchema(RolesSchema);

Meteor.roles.allow({
  "insert": function (userId) {
    // Only Administrators can insert
    return Roles.userIsInRole(userId, ['admin']);
  }
});
