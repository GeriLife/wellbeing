Meteor.methods('getHomeResidentIds', function (homeId) {
  // Get all residents of specific home
  var residents = Residents.find({'homeId': homeId}).fetch();

  // Create an array containing only resident IDs
  var residentIds = _.map(residents, function (resident) {
    return resident._id;
  });

  // return the resident IDs array
  return residentIds;
});
