Groups = new Mongo.Collection('groups');

var GroupsSchema = new SimpleSchema({
  name:{
    type:String,
    label: 'Group Name',
  }
});

Groups.attachSchema(GroupsSchema);
