Template.newHome.created = function () {
  // Create reference to template instance
  var instance = this;
  instance.groups = new ReactiveVar(null);

  Meteor.call('currentUserGroups', function (error, userGroups) {
    if (!error) {
      instance.groups.set(userGroups);
    }
  });
};

Template.newHome.helpers({
  groupIdOptions: function () {
    return _.map(Template.instance().groups.get(), function (group) {
      return {
        label: group.name,
        value: group._id,
      };
    });
  },
});
