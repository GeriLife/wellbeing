Meteor.publish('allActivities', function () {
  return Activities.find();
});
