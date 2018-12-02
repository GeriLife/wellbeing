Meteor.publish('allResidents', function () {
  // Publish all residents
  return Residents.find();
});

Meteor.publish('allCurrentResidents', function () {
  // Find all current residencies
  const currentResidencies = Residencies.find({
    moveOut: {$exists: false},
  }).fetch();

  // Get resident IDs from residencies
  const currentResidentIds = _.map(currentResidencies, (residency) => {
    return residency.residentId;
  });

  // Publish all current residents
  return Residents.find({_id: {$in: currentResidentIds}});
});

Meteor.publish('singleResident', function (residentId) {
  // Publish all residents
  return Residents.find(residentId);
});

Meteor.publish('selectResidents', function (residentIdsArray) {
  // Publish residents indicated by array of IDs
  return Residents.find({_id: {$in: residentIdsArray}});
});

Meteor.publish('homeCurrentResidents', function (homeId) {
  // Find all residencies for given home
  const homeResidencies = Residencies.find({
    homeId,
    moveOut: {$exists: false},
  }).fetch();

  // Get resident IDs from residencies
  const homeResidentIds = _.map(homeResidencies, (residency) => {
    return residency.residentId;
  });

  // Publish all current residents of a given home
  return Residents.find({_id: {$in: homeResidentIds}});
});
