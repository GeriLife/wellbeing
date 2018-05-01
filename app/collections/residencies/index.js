import ResidenciesSchema from './schema';

export default Residencies = new Mongo.Collection('residencies');

Residencies.attachSchema(ResidenciesSchema);
