Template.groups.created = function () {
  var instance = this;

  instance.subscribe('allGroups');
};

Template.groups.helpers({
  'groups': function () {
    return Groups.find({}, {sort: {name: 1}});
  }
});
