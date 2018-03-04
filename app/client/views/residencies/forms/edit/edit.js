Template.editResidencyModal.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get resident and home IDs
  const { residentId, homeId } = templateInstance.data;

  // Create options list for residentId select
  templateInstance.residentIdSelectOptions = new ReactiveVar();

  // Subscribe to single residency, if available
  templateInstance.subscribe('singleResidency', residentId, homeId);

  // Subscribe to all residents, for the resident select options
  templateInstance.subscribe('allResidents');

  // Subscribe to all homes, for the home select options
  templateInstance.subscribe('allHomes');

  // Subscribe to all groups, so homes can be grouped in select menu
  templateInstance.subscribe('allGroups');

  Meteor.call('getAllResidentSelectOptions', (error, residentIdSelectOptions) => {
    // update the resident ID select options reactive variable
    templateInstance.residentIdSelectOptions.set(residentIdSelectOptions);
  })
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
  }
});
