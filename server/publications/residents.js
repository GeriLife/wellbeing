Meteor.publish('allResidents', function () {
  return Residents.find();
});
