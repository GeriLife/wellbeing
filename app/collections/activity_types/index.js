import ActivityTypesSchema from './schema';

export default ActivityTypes = new Mongo.Collection('activityTypes');

ActivityTypes.attachSchema(ActivityTypesSchema);
