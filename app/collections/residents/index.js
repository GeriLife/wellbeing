import ResidentsSchema from './schema';

Residents = new Mongo.Collection('residents');

Residents.attachSchema(ResidentsSchema);
