import Residents from '../';

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
