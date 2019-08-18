Meteor.methods({
  createTestUser(user) {
    return Accounts.createUser(user);
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
});
