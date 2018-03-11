import SimpleSchema from 'simpl-schema';

export default UserEventLog = new Mongo.Collection('userEvents');

const UserEventLogSchema = new SimpleSchema({
  eventDate: {
    type: Date,
    optional: false,
    autoValue () {
      return new Date();
    },
  },
  userId: {
    type: String,
    optional: false,
  },
  action: {
    type: String,
    optional: false,
  },
  entityType: {
    type: String,
    optional: true,
  },
  entityId: {
    type: String,
    optional: true,
  },
});

UserEventLog.attachSchema(UserEventLogSchema);
