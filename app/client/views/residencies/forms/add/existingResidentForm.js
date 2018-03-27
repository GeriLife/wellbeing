Template.addResidencyForExistingResidentForm.onCreated(function () {
  const templateInstance = this;

  // reactive placeholder for home select options with groups
  templateInstance.homeSelectOptionsWithGroups = new ReactiveVar();

  // get home select options with groups from server
  Meteor.call('getHomeSelectOptionsWithGroups', (error, homeSelectOptionsWithGroups) => {
    // update reactive variable with home select options
    templateInstance.homeSelectOptionsWithGroups.set(homeSelectOptionsWithGroups)
  });
});

Template.addResidencyForExistingResidentForm.helpers({
  homeSelectOptionsWithGroups () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get home select options with groups
    return templateInstance.homeSelectOptionsWithGroups.get()
  },
  residentIdOptions () {
    // Get all residents
    const residents = Residents.find({}, {sort: {firstName: 1, lastInitial: 1}}).fetch();

    // create options list for select
    residentOptions = _.map(residents, function (resident) {
      // Create option for this resident, with ID as the value
      return {label: resident.fullName(), value: resident._id};
    });

    return residentOptions;
  },
  today () {
    // Default date today, as a string
    return Date();
  },
});
