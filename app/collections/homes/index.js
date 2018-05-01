import HomesSchema from './schema';

export default Homes = new Mongo.Collection('homes');

Homes.attachSchema(HomesSchema);
