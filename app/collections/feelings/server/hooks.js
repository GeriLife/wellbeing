Feelings.after.insert(function (userId, feeling) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'feeling',
    entityId: feeling._id,
  })
});

Feelings.after.update(function (userId, feeling) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'feeling',
    entityId: feeling._id,
  })
});

Feelings.after.remove(function (userId, feeling) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'feeling',
    entityId: feeling._id,
  })
});
