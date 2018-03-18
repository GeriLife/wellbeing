Template.editHome.onCreated(function () {
  // Get reference to template instance
  var instance = this;

  // Get reference to router
  var router = Router.current();

  // Get Home ID from router parameter
  var homeId = router.params.homeId;

  // Subscribe to single home, based on Home ID
  instance.subscribe('singleHome', homeId);

  // Subscribe to all groups, for the group select options
  instance.subscribe('allGroups');
});

Template.editHome.helpers({
  groupOptions () {
    // Get all groups
    const groups = Groups.find().fetch();
    
    // Create options list of groups with label/value keys
    const groupOptions = _.map(groups, function (group) {
      return {
        label: group.name,
        value: group._id,
      }
    });

    return groupOptions;
  }
})
