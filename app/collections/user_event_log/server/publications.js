import UserEventLog from '/collections/user_event_log/';

ReactiveTable.publish('userEventLog-paginated', function () {
  if (this.userId) {
      return UserEventLog;
    } else {
      return [];
    }
});
