Template.editHome.onCreated(function () {
  // Get reference to template instance
  const instance = this;
  instance.home = new ReactiveVar(null);
  instance.groups = new ReactiveVar(null);

  // Get reference to router
  const router = Router.current();

  // Get Home ID from router parameter
  const homeId = router.params.homeId;

  Meteor.call('getHomeDetails', homeId, function (err, homeDetails) {
    if (!err) {
      instance.home.set(homeDetails);
    }
  });

  Meteor.call('currentUserGroups', function (error, userGroups) {
    if (!error) {
      instance.groups.set(userGroups);
    }
  });
});

Template.editHome.helpers({
  groupOptions() {
    const groupOptions = _.map(
      Template.instance().groups.get(),
      function (group) {
        return {
          label: group.name,
          value: group._id,
        };
      }
    );

    return groupOptions;
  },

  home() {
    return Template.instance().home.get();
  },

  isReadyToRender() {
    return (
      Template.instance().groups.get() !== null &&
      Template.instance().home.get() !== null
    );
  },
});
