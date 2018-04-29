Residencies.after.insert(function (userId, residency) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'residency',
    entityId: residency._id,
  })
});

Residencies.after.update(function (userId, residency) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'residency',
    entityId: residency._id,
  })
});

Residencies.after.remove(function (userId, residency) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'residency',
    entityId: residency._id,
  })
});
