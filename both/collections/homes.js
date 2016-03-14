Homes = new Mongo.Collection('homes');

var HomesSchema = new SimpleSchema({
  name:{
    type:String
  },
  groupId: {
    type: String,
    autoform: {
      options: function() {
        return _.map(Groups.find().fetch(), function(group) {
          return {
            label: group.name,
            value: group._id
          };
        });
      }
    }
  }
});

// Add i18n tags
HomesSchema.i18n("homes");

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
