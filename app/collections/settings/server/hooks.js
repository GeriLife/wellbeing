import Settings from '../';

Settings.after.insert(function (userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'setting',
    entityId: setting._id,
  })
});

Settings.after.update(function (userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'setting',
    entityId: setting._id,
  })
});

Settings.after.remove(function (userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'setting',
    entityId: setting._id,
  })
});
