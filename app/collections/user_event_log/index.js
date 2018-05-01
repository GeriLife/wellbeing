import UserEventLogSchema from './schema';

export default UserEventLog = new Mongo.Collection('userEvents');

UserEventLog.attachSchema(UserEventLogSchema);
