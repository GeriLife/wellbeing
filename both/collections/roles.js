var RolesSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  }
});

Meteor.roles.attachSchema(RolesSchema);
