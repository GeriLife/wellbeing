Template.editResidencyModal.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get resident and home IDs
  const { residentId, homeId } = templateInstance.data;

  // Subscribe to single residency, if available
  templateInstance.subscribe('singleResidency', residentId, homeId);

  // reactive placeholder for residentId select
  templateInstance.residentIdSelectOptions = new ReactiveVar();

  // reactive placeholder for home select options with groups
  templateInstance.homeSelectOptionsWithGroups = new ReactiveVar();

  Meteor.call('getAllResidentSelectOptions', (error, residentIdSelectOptions) => {
    // update the resident ID select options reactive variable
    templateInstance.residentIdSelectOptions.set(residentIdSelectOptions);
  });

  // get home select options with groups from server
  Meteor.call('getHomeSelectOptionsWithGroups', (error, homeSelectOptionsWithGroups) => {
    // update reactive variable with home select options
    templateInstance.homeSelectOptionsWithGroups.set(homeSelectOptionsWithGroups)
  });
});

Template.editResidencyModal.helpers({
  today () {
    // Default date today, as a string
    return Date();
  },
  residency () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get resident and home IDs from template instance
    const { residentId, homeId } = templateInstance.data;

    if (residentId && homeId) {
      // Check for existing residency
      // Return residency document or undefined
      return Residencies.findOne({ residentId, homeId })
    }
  },
  residentIdOptions () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    return templateInstance.residentIdSelectOptions.get();
  },
  homeSelectOptionsWithGroups () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    return templateInstance.homeSelectOptionsWithGroups.get();
  }
});
