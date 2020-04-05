import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

ActivityTypes = new Mongo.Collection('activityTypes');

var ActivityTypesSchema = new SimpleSchema({
  name: {
    type: String,
  },
});

ActivityTypes.allow({
  insert() {
    return false;
  },
  remove() {
    return false;
  },
  update() {
    return false;
  },
});

ActivityTypes.attachSchema(ActivityTypesSchema);

ActivityTypes.after.insert(function(userId, activityType) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'activityType',
    entityId: activityType._id,
  });
});

ActivityTypes.after.update(function(userId, activityType) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'activityType',
    entityId: activityType._id,
  });
});

ActivityTypes.after.remove(function(userId, activityType) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'activityType',
    entityId: activityType._id,
  });
});
export const ActivityTypesCollection = ActivityTypes;
