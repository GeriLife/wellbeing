import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

ActivityTypes = new Mongo.Collection('activityTypes');

var ActivityTypesSchema = new SimpleSchema({
  name: {
    type: String
  }
});

ActivityTypes.allow({
  insert () {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Chack if user is administrator
    const userIsAdmin = Roles.userIsInRole(currentUserId, 'admin');

    // Only Admin user can insert
    return userIsAdmin;
  },
  remove () {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Chack if user is administrator
    const userIsAdmin = Roles.userIsInRole(currentUserId, 'admin');

    // Only Admin user can remove
    return userIsAdmin;
  },
  update () {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Chack if user is administrator
    const userIsAdmin = Roles.userIsInRole(currentUserId, 'admin');

    // Only Admin user can update
    return userIsAdmin;
  }
});

ActivityTypes.attachSchema(ActivityTypesSchema);

ActivityTypes.after.insert(function (userId, activityType) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'activityType',
    entityId: activityType._id,
  })
});

ActivityTypes.after.update(function (userId, activityType) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'activityType',
    entityId: activityType._id,
  })
});

ActivityTypes.after.remove(function (userId, activityType) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'activityType',
    entityId: activityType._id,
  })
});
