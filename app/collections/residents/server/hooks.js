import Residents from '../';
import UserEventLog from '/collections/user_event_log';

Residents.after.insert(function (userId, resident) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'resident',
    entityId: resident._id,
  })
});

Residents.after.update(function (userId, resident) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'resident',
    entityId: resident._id,
  })
});

Residents.after.remove(function (userId, resident) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'resident',
    entityId: resident._id,
  })
});
