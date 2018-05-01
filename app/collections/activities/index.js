import ActivitiesSchema from './schema';

export default Activities = new Mongo.Collection('activities');

// Attach schema to collection
Activities.attachSchema(ActivitiesSchema);
