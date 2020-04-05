import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

Homes = new Mongo.Collection('homes');

const HomesSchema = new SimpleSchema({
  name:{
    type:String
  },
  groupId: {
    type: String,
    custom(){
      return !!this.docId ? 'notAllowed' : undefined;
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

Homes.allow({
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

Homes.after.insert(function (userId, home) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'home',
    entityId: home._id,
  })
});

Homes.after.update(function (userId, home) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'home',
    entityId: home._id,
  })
});

Homes.after.remove(function (userId, home) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'home',
    entityId: home._id,
  })
});

export const HomesCollection = Homes