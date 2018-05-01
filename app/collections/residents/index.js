import ResidentsSchema from './schema';

export default Residents = new Mongo.Collection('residents');

Residents.attachSchema(ResidentsSchema);
