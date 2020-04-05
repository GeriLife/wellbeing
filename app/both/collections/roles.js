import SimpleSchema from 'simpl-schema';

var RolesSchema = new SimpleSchema({
  name: {
    type: String,
  },
});

Meteor.roles.attachSchema(RolesSchema);

Meteor.roles.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  },
  remove: function () {
    return false;
  },
});
