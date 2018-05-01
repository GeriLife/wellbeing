import ActivityTypes from '../';

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
