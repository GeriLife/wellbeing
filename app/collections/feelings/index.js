import SimpleSchema from 'simpl-schema';
import UserEventLog from '/collections/user_event_log/';

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
