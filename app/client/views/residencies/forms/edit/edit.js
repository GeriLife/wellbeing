Template.editResidencyModal.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

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
    const templateInstance = Template.instance();

    if (templateInstance.data.residency) {
      return templateInstance.data.residency;
    }
  },
  residentIdOptions () {
    const templateInstance = Template.instance();

    return templateInstance.residentIdSelectOptions.get();
  },
  homeSelectOptionsWithGroups () {
    const templateInstance = Template.instance();

    return templateInstance.homeSelectOptionsWithGroups.get();
  }
});
