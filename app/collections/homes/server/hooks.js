import Homes from '../';
import UserEventLog from '/collections/user_event_log';

Homes.after.insert(function (userId, home) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'home',
    entityId: home._id,
  })
});

Homes.after.update(function (userId, home) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'home',
    entityId: home._id,
  })
});

Homes.after.remove(function (userId, home) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'home',
    entityId: home._id,
  })
});
