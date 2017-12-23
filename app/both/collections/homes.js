import SimpleSchema from 'simpl-schema';

Homes = new Mongo.Collection('homes');

var HomesSchema = new SimpleSchema({
  name:{
    type:String
  },
  groupId: {
    type: String,
  }
});

// Add i18n tags
// HomesSchema.i18n("homes");

Homes.attachSchema(HomesSchema);

Homes.helpers({
  groupName: function () {
    // Get the Group ID;
    var groupId = this.groupId;

    // Get Group from Groups collection, by ID(s)
    var group = Groups.findOne(groupId);

    // Return the Group name
    return group.name;
  }
});

Homes.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  }
});
