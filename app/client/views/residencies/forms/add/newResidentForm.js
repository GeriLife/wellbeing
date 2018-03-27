import newResidentAndResidencySchema from '/both/schemas/newResidentAndResidencySchema';

Template.addResidencyForNewResidentForm.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // reactive placeholder for home select options with groups
  templateInstance.homeSelectOptionsWithGroups = new ReactiveVar();

  // get home select options with groups from server
  Meteor.call('getHomeSelectOptionsWithGroups', (error, homeSelectOptionsWithGroups) => {
    // update reactive variable with home select options
    templateInstance.homeSelectOptionsWithGroups.set(homeSelectOptionsWithGroups)
  });
})

Template.addResidencyForNewResidentForm.helpers({
  newResidentAndResidencySchema () {
    return newResidentAndResidencySchema;
  },
  homeSelectOptionsWithGroups () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    return templateInstance.homeSelectOptionsWithGroups.get();
  },
  today () {
    // Default date today, as a string
    return Date();
  },
});
