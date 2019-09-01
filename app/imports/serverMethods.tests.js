Meteor.methods({
  createTestUser(user) {
    const existingUser = Accounts.findUserByEmail(user.email);
    if (!existingUser) return Accounts.createUser(user);
    return existingUser;
  },
  removeUser(email) {
    return Meteor.users.remove({
      'emails.0.address': email,
    });
  },
  addActivity(activity) {
    return Activities.insert(activity);
  },
  updateActivity({ id, dataModifier }) {
    return Activities.update({ _id: id }, dataModifier);
  },
  getActivity() {
    return Activities.findOne();
  },
  removeGroup(id) {
    return Groups.remove(id);
  },
  addGroup(data) {
    return Groups.insert(data);
  },
  updateGroup(_id, data) {
    return Groups.update({ _id }, data);
  },
  removeGroup(id) {
    return Groups.remove(id);
  },
});
