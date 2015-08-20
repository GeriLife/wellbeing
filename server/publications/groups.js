Meteor.publish('allGroups', function () {
  return Groups.find();
});
