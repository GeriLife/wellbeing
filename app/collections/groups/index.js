import SimpleSchema from 'simpl-schema';
import UserEventLog from '/collections/user_event_log/';

export default Groups = new Mongo.Collection('groups');

var GroupsSchema = new SimpleSchema({
  name: {
    type: String
  }
});

Groups.attachSchema(GroupsSchema);

Groups.helpers({
  'homes': function () {
    // Get group ID
    var groupId = this._id;

    // Get all homes assigned to group
    var homes = Homes.find({'groupId': groupId}).fetch();

    return homes;
  }
});

Groups.allow({
  insert () {
    // Get user ID
    const userId = Meteor.userId();

    // Check if user is administrator
    const userIsAdmin = Roles.userIsInRole(userId, ['admin']);

    if (userIsAdmin) {
      // admin user can insert
      return true;
    }
  },
  update () {
    // Get user ID
    const userId = Meteor.userId();

    // Check if user is administrator
    const userIsAdmin = Roles.userIsInRole(userId, ['admin']);

    if (userIsAdmin) {
      // admin user can update
      return true;
    }
  }
});
