Template.newFeeling.created = function () {
  this.subscribe('allResidents');
  this.subscribe('allHomes');
};

Template.newFeeling.helpers({
  "residentOptions": function() {
    // Get all Homes
    var homes = Homes.find().fetch();

    // Create an array of Home IDs
    var homeIDs = _.map(homes, function (home) {
      return home._id;
    });

    // Create select options for residents input
    // Grouping residents by home
    var residentSelectOptions = _.map(homeIDs, function (homeID) {
      // Find the name of this home
      var homeName = Homes.findOne(homeID).name;

      // Get all residents of this home
      var homeResidents = Residents.find({homeId: homeID}).fetch();

      // Create a residents array with name/ID pairs for label/value
      var residentOptions = _.map(homeResidents, function (homeResident) {
        // Combine resident first name and last initial
        var residentName = homeResident.firstName + ' ' + homeResident.lastInitial;

        // Create option for this resident, with ID as the value
        return {label: residentName, value: homeResident._id};
      });

      // Return residents and home as option group
      return {optgroup: homeName, options: residentOptions};
    });

    return residentSelectOptions;
  }
});
