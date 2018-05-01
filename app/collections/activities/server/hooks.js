import Activities from '../';
import UserEventLog from '/collections/user_event_log';

Activities.after.insert(function (userId, activity) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'activity',
    entityId: activity._id,
  })
});

Activities.after.update(function (userId, activity) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'activity',
    entityId: activity._id,
  })
});

Activities.after.remove(function (userId, activity) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'activity',
    entityId: activity._id,
  })
});
