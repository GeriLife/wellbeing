Template.newFeeling.onCreated(function() {
  // Get reference to template instance
  const templateInstance = this;

  // placeholder for resident select options
  templateInstance.residentOptions = new ReactiveVar();

  // Create reactive variable for selected feeling
  templateInstance.selectedFeeling = new ReactiveVar();

  Meteor.call("userVisibleResidentNamesGroupedtByHomes", function(
    error,
    residentSelectOptions
  ) {
    templateInstance.residentOptions.set(residentSelectOptions);
  });
});

Template.newFeeling.helpers({
  residentOptions: function() {
    const templateInstance = Template.instance();

    return templateInstance.residentOptions.get();
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
