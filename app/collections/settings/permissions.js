import Settings from './';

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
