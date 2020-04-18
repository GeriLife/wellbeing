import { isCurrentUserAdmin } from '../utils/user';

Meteor.methods({
  addRole(roleName) {
    if (!isCurrentUserAdmin()) {
      throw new Meteor.Error(500, 'Operation not allowed');
    }
    return Meteor.roles.insert(roleName, { filter: false });
  },

  getRolesExceptAdmin() {
    return Meteor.roles
      .find({ name: { $ne: 'admin' } }, { sort: { name: 1 } })
      .fetch();
  },
});
