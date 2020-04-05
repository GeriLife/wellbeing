import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

Groups = new Mongo.Collection('groups');

var GroupsSchema = new SimpleSchema({
  name: {
    type: String,
    max: 30
  }
});

Groups.attachSchema(GroupsSchema);

Groups.helpers({
  'homes': function () {
    return Homes.find({'groupId': this._id}).fetch();
  }
});

Groups.allow({
  insert () {
   return false;
  },
  update () {
    return false;
  }
});

Groups.after.insert(function (userId, group) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'group',
    entityId: group._id,
  })
});

Groups.after.update(function (userId, group) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'group',
    entityId: group._id,
  })
});

Groups.after.remove(function (userId, group) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'group',
    entityId: group._id,
  })
});

export const GroupsCollection = Groups;
