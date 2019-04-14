Template.newFeeling.onCreated(function() {
  // Get reference to template instance
  const templateInstance = this;

  // Subscribe to user-visible homes, residencies, and residents
  templateInstance.subscribe("currentUserVisibleHomes");
  templateInstance.subscribe("currentUserVisibleResidencies");
  templateInstance.subscribe("currentUserVisibleResidents");

  // Create reactive variable for selected feeling
  templateInstance.selectedFeeling = new ReactiveVar();
});

Template.newFeeling.helpers({
  residentOptions: function() {
    // Get list of homes, sorted alphabetically
    const homes = Homes.find({}, { sort: { name: 1 } }).fetch();

    // Create an array residents grouped by home
    const residentsSelectOptions = _.map(homes, function(home) {
      // Get home ID
      const homeId = home._id;

      // do not show residents who are on hiatus
      const onHiatus = false;

      // Sort by first name in alphabetical order
      const sort = { firstName: 1 };

      // Get a list of residents for current home
      const homeResidencies = Residencies.find(
        {
          homeId,
          moveOut: { $exists: false }
        },
        { sort }
      ).fetch();

      const homeResidentIds = _.map(homeResidencies, function(residency) {
        return residency.residentId;
      });
      console.log(homeResidentIds);

      // Create an object containing a home and its residents
      const homeGroup = {
        optgroup: home.name,
        options: _.map(homeResidentIds, function(residentId) {
          const resident = Residents.findOne(residentId);

          // Create an object containing the resident name and ID
          const residentObject = {
            value: residentId,
            label: resident.fullName()
          };

          return residentObject;
        })
      };

      return homeGroup;
    });

    return residentsSelectOptions;
  },
  selectedFeeling: function() {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Return value of selected feeling reactive variable
    return templateInstance.selectedFeeling.get();
  },
  feelingNotSelected(feeling) {
    // Check whether any feeling has been selected
    // if a feeling has been selected that is different from the current feeling
    //   return 'not-selected'
    // helper is used to add 'not-selected' class to feelings not selected

    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get currently selected feeling
    const selectedFeeling = templateInstance.selectedFeeling.get();

    // Check if this feeling is NOT selected
    const thisFeelingNotSelected = feeling !== selectedFeeling;

    // Check if
    //  feeling has been selected
    //  selected feeling is different from this feeling
    if (selectedFeeling && thisFeelingNotSelected) {
      return "not-selected";
    }
  }
});

Template.newFeeling.events({
  "click #joy": function(event, templateInstance) {
    // Set selected feeling reactive variable
    templateInstance.selectedFeeling.set("joy");
  },
  "click #fear": function(event, templateInstance) {
    // Set selected feeling reactive variable
    templateInstance.selectedFeeling.set("fear");
  },
  "click #sad": function(event, templateInstance) {
    // Set selected feeling reactive variable
    templateInstance.selectedFeeling.set("sad");
  },
  "click #anger": function(event, templateInstance) {
    // Set selected feeling reactive variable
    templateInstance.selectedFeeling.set("anger");
  }
});
