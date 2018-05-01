import ActivitiesSchema from './schema';
import UserEventLog from '/collections/user_event_log/';

export default Activities = new Mongo.Collection('activities');

// Attach schema to collection
Activities.attachSchema(ActivitiesSchema);
