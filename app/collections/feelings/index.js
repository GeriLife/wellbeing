import FeelingsSchema from './schema';

export default Feelings = new Mongo.Collection("feelings");

Feelings.attachSchema(FeelingsSchema);
