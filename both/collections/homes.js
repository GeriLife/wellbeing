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
