Template.activitiesTableResidentNamesFilter.onRendered(function () {
  // Render Bootstrap select widget on resident filter
  $('#resident-filter').selectpicker();
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
})
