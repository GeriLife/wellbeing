Meteor.publish('allResidents', function () {
  return Residents.find();
});

Meteor.publish('selectResidents', function (residentIdsArray) {
  return Residents.find({_id: {$in: residentIdsArray}});
});
