Meteor.publish('allResidents', function () {
  // Publish all residents
  return Residents.find();
});

Meteor.publish('singleResident', function (residentId) {
  // Publish all residents
  return Residents.find(residentId);
});

Meteor.publish('selectResidents', function (residentIdsArray) {
  // Publish residents indicated by array of IDs
  return Residents.find({_id: {$in: residentIdsArray}});
});

Meteor.publish('homeResidents', function (homeId) {
  // Publish all residents of a given home
  return Residents.find({homeId: homeId});
});
