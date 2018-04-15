import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

Feelings = new Mongo.Collection("feelings");

Feelings.Schema = new SimpleSchema({
  residentId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  feeling: {
    type: String
  },
  date: {
    type: Date,
    autoValue: function () {
      // Get current date
      var currentDate = new Date();

      return currentDate;
    },
  }
});

Feelings.attachSchema(Feelings.Schema);

Feelings.allow({
  insert: function () {
    return true;
  }
});

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
