Meteor.publish('allHomes', function () {
  // All homes publication
  return Homes.find();
});
