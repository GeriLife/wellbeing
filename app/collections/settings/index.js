import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

Settings = new Mongo.Collection("settings");

Settings.allow({
  insert: function () {
    // Get ID of current Meteor user
    var userId = Meteor.userId();

    // Only allow admin users to insert settings
    return Roles.userIsInRole(userId, ['admin']);
  },
  update: function () {
    // Get ID of current Meteor user
    var userId = Meteor.userId();

    // Only allow admin users to update settings
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove: function () {
    // Get ID of current Meteor user
    var userId = Meteor.userId();

    // Only allow admin users to update settings
    return Roles.userIsInRole(userId, ['admin']);
  }
});

if (Meteor.isServer) {
  // Make sure settings names are unique
  Settings._ensureIndex({name: 1}, {unique: 1});
}

Settings.after.insert(function (userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'setting',
    entityId: setting._id,
  })
});

Settings.after.update(function (userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'setting',
    entityId: setting._id,
  })
});

Settings.after.remove(function (userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'setting',
    entityId: setting._id,
  })
});
