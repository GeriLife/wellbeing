Template.newHome.created = function () {
  // Create reference to template instance
  var instance = this;

  // Subscribe to all Groups
  instance.subscribe('allGroups');
};

Template.newHome.helpers({
  groupIdOptions: function() {
    return _.map(Groups.find().fetch(), function(group) {
      return {
        label: group.name,
        value: group._id
      };
    });
  }
});
