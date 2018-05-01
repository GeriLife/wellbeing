import SimpleSchema from 'simpl-schema';
import UserEventLog from '/collections/user_event_log/';

export default Settings = new Mongo.Collection("settings");

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
