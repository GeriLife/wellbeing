Template.activitiesTableResidentNamesFilter.onCreated(function () {
  // Initialize ReactiveTable filter for residents
  this.filter = new ReactiveTable.Filter('residentFilter', ['residentIds']);
});

Template.activitiesTableResidentNamesFilter.events({
   "change #resident-filter": function (event, templateInstance) {
     // get selected resident ID
     var residentId = $(event.target).val();

      // Set filter to contain resident ID
      templateInstance.filter.set(residentId);
   }
});

Template.activitiesTableResidentNamesFilter.helpers({
  residentNamesGroupedtByHomes () {
    // Get list of homes, sorted alphabetically
    const homes = Homes.find({}, {sort: {name: 1}}).fetch();

    // Create an array residents grouped by home
    const residentsSelectOptions = _.map(homes, function (home) {
      // Get home ID
      const homeId = home._id;

      // do not show departed residents
      const departed = false;

      // Sort by first name in alphabetical order
      const sort = {firstName: 1}

      // Get a list of residents for current home
      const homeResidents = Residents.find({ homeId, departed }, {sort}).fetch();

      // Create an object containing a home and its residents
      const homeGroup = {
        optgroup: home.name,
        options: _.map(homeResidents, function (resident) {
          // Create an object containing the resident name and ID
          const residentObject = {
            value: resident._id,
            label: resident.fullName()
          };

          return residentObject;
       })
      }

      return homeGroup;
    });

    return residentsSelectOptions;
  },
});
