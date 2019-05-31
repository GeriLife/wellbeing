Template.addResidencyForExistingResidentForm.onCreated(function () {
  const templateInstance = this;

  // reactive placeholder for home select options with groups
  templateInstance.homeSelectOptionsWithGroups = new ReactiveVar();
  templateInstance.residentsWithoutActiveResidencies = new ReactiveVar();

  // get home select options with groups from server
  Meteor.call(
    "getHomeSelectOptionsWithGroups",
    (error, homeSelectOptionsWithGroups) => {
      // update reactive variable with home select options
      templateInstance.homeSelectOptionsWithGroups.set(
        homeSelectOptionsWithGroups
      );
    }
  );
  Meteor.call(
    "getResidentsWithoutActiveResidencies",
    (error, residentsWithoutActiveResidencies) => {
      templateInstance.residentsWithoutActiveResidencies.set(
        residentsWithoutActiveResidencies
      );
    }
  );

});

Template.addResidencyForExistingResidentForm.helpers({
  homeSelectOptionsWithGroups() {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get home select options with groups
    return templateInstance.homeSelectOptionsWithGroups.get();
  },
  residentIdOptions() {
    // Get all residents
    const residents = Template.instance().residentsWithoutActiveResidencies.get();

    // create options list for select
    const residentOptions = _.map(residents, function (resident) {
      // Create option for this resident, with ID as the value
      const { firstName, lastInitial } = resident;
      const fullName = [firstName, lastInitial].join(" ");
      return { label: fullName, value: resident._id };
    });

    return residentOptions;
  },
  today() {
    // Default date today, as a string
    return Date();
  }
});
