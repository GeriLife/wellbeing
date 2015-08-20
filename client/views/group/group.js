Template.group.helpers({
  'homes': function () {
    // Get homes for this group
    var groupId = Router.current().params.groupId;
    return Homes.find({ "groupId": groupId });
  }
});

Template.group.created = function () {
  var instance = this;

  // Get group ID
  var groupId = Router.current().params.groupId;

  // Subscribe to homes beonging to group
  instance.subscribe('homesBelongingToGroup', groupId);
};
