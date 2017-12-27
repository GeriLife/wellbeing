Template.group.helpers({
  'group': function () {
    var instance = Template.instance();

    // Get Group ID from template instance
    var groupId = instance.groupId;

    // Get group from Groups collection
    var group = Groups.findOne(groupId);

    return group;
  },
  'homes': function () {
    var instance = Template.instance();

    // Get homes for this group
    var groupId = instance.groupId;

    return Homes.find({ "groupId": groupId });
  }
});

Template.group.created = function () {
  var instance = this;

  // Get group ID
  instance.groupId = Router.current().params.groupId;

  // Subscribe to single group
  instance.subscribe('singleGroup', instance.groupId);

  // Subscribe to homes beonging to group
  instance.subscribe('homesBelongingToGroup', instance.groupId);
};
