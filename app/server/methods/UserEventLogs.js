import { isCurrentUserAdmin } from '../utils/user';
import UserEventLog from '/both/collections/userEventLog';

Meteor.methods({
  getUserEventLogs() {
    if (isCurrentUserAdmin()) {
      return UserEventLog.find().fetch();
    }

    return [];
  },
});
