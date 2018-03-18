import UserEventLog from '/both/collections/userEventLog';

ReactiveTable.publish('userEventLog-paginated', function () {
  if (this.userId) {
      return UserEventLog;
    } else {
      return [];
    }
});
