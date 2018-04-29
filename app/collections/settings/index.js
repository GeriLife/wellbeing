import SimpleSchema from 'simpl-schema';
import UserEventLog from '/collections/user_event_log/';

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
