Template.newFeeling.created = function () {
  // Get reference to template instance
  const templateInstance = this;

  // Subscribe to residents and homes
  this.subscribe('allResidents');
  this.subscribe('allHomes');

  // Create reactive variable for selected feeling
  templateInstance.selectedFeeling = new ReactiveVar();
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
  },
  "selectedFeeling": function () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Return value of selected feeling reactive variable
    return templateInstance.selectedFeeling.get();
  },
  feelingNotSelected (feeling) {
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
      return 'not-selected';
    }
  }
});

Template.newFeeling.events({
  "click #joy": function (event, templateInstance) {
    // Set selected feeling reactive variable
    templateInstance.selectedFeeling.set("joy");
  },
  "click #fear": function (event, templateInstance) {
    // Set selected feeling reactive variable
    templateInstance.selectedFeeling.set("fear");
  },
  "click #sad": function (event, templateInstance) {
    // Set selected feeling reactive variable
    templateInstance.selectedFeeling.set("sad");
  },
  "click #anger": function (event, templateInstance) {
    // Set selected feeling reactive variable
    templateInstance.selectedFeeling.set("anger");
  },
});
