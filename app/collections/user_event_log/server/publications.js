import UserEventLog from '../';

ReactiveTable.publish('userEventLog-paginated', function () {
  if (this.userId) {
      return UserEventLog;
    } else {
      return [];
    }
});
