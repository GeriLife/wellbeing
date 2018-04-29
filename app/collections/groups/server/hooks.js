Groups.after.insert(function (userId, group) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'group',
    entityId: group._id,
  })
});

Groups.after.update(function (userId, group) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'group',
    entityId: group._id,
  })
});

Groups.after.remove(function (userId, group) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'group',
    entityId: group._id,
  })
});
