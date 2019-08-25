Template.addResidencyForExistingResidentForm.onCreated(function() {
  const templateInstance = this;

  // reactive placeholder for home select options with groups
  templateInstance.homeSelectOptionsWithGroups = new ReactiveVar();
  templateInstance.residentsWithoutActiveResidencies = new ReactiveVar();

  // get home select options with groups from server
  Meteor.call(
    'getHomeSelectOptionsWithGroups',
    (error, homeSelectOptionsWithGroups) => {
      // update reactive variable with home select options
      templateInstance.homeSelectOptionsWithGroups.set(
        homeSelectOptionsWithGroups
      );
    }
  );
  Meteor.call(
    'getResidentsWithoutActiveResidencies',
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
    const residencyObj = Template.instance().data;
    const hasPrefilledResidentData = residencyObj
      ? !!residencyObj.data
      : false;
    // Get all residents
    const residents = Template.instance().residentsWithoutActiveResidencies.get();

    // create options list for select
    let residentOptions;
    residentOptions = _.map(residents, makeResidentDropDownOptions);

    /* If the resident is already provided do not add other resident options */
    if (hasPrefilledResidentData) {
      residentOptions = [
        _.find(residentOptions, function(resident) {
          return resident.value === residencyObj.data.residentId;
        }),
      ];
    }

    return residentOptions;
  },
  today() {
    // Default date today, as a string
    return Date();
  },

  residency() {
    const residencyObj = Template.instance().data;
    return residencyObj ? residencyObj.data : {};
  },
});

Template.addResidencyForExistingResidentForm.events({
  'click .undo'(event, templateInstance) {
    if (templateInstance.data.dismiss)
      templateInstance.data.dismiss();
  },
});

function makeResidentDropDownOptions(resident) {
  // Create option for this resident, with ID as the value
  const { firstName, lastInitial } = resident;
  const fullName = [firstName, lastInitial].join(' ');
  return { label: fullName, value: resident._id };
}
