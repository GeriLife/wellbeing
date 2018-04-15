import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

Groups = new Mongo.Collection('groups');

var GroupsSchema = new SimpleSchema({
  name: {
    type: String
  }
});

Groups.attachSchema(GroupsSchema);

Groups.helpers({
  'homes': function () {
    // Get group ID
    var groupId = this._id;

    // Get all homes assigned to group
    var homes = Homes.find({'groupId': groupId}).fetch();

    return homes;
  }
});

Groups.allow({
  insert () {
    // Get user ID
    const userId = Meteor.userId();

    // Check if user is administrator
    const userIsAdmin = Roles.userIsInRole(userId, ['admin']);

    if (userIsAdmin) {
      // admin user can insert
      return true;
    }
  },
  update () {
    // Get user ID
    const userId = Meteor.userId();

    // Check if user is administrator
    const userIsAdmin = Roles.userIsInRole(userId, ['admin']);

    if (userIsAdmin) {
      // admin user can update
      return true;
    }
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
