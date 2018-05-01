import GroupsSchema from './schema';

export default Groups = new Mongo.Collection('groups');

Groups.attachSchema(GroupsSchema);
