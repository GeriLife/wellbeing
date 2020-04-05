import { isCurrentUserAdmin } from '../utils/user';

Meteor.methods({
  addRole(roleName) {
    if (!isCurrentUserAdmin()) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }
    return Meteor.roles.insert(roleName, { filter: false });
  },
});
