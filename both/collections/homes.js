Homes = new Mongo.Collection('homes');

var HomesSchema = new SimpleSchema({
  name:{
    type:String,
    label: 'Home Name',
  },
  groupId: {
    type: String,
    label: 'Group',
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
