Template.editResidencyModal.onCreated(function() {
  // Get reference to template instance
  const templateInstance = this;

  // reactive placeholder for residentId select
  templateInstance.residentIdSelectOptions = new ReactiveVar();

  // reactive placeholder for home select options with groups
  templateInstance.homeSelectOptionsWithGroups = new ReactiveVar();
  templateInstance.addNewResidencyClicked = new ReactiveVar(false);

  Meteor.call(
    'getAllResidentSelectOptions',
    (error, residentIdSelectOptions) => {
      // update the resident ID select options reactive variable
      templateInstance.residentIdSelectOptions.set(
        residentIdSelectOptions
      );
    }
  );

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
});

Template.editResidencyModal.helpers({
  note() {
    return TAPi18n.__("residencies.note")
  },
  today() {
    // Default date today, as a string
    return Date();
  },
  residency() {
    const templateInstance = Template.instance();

    if (templateInstance.data.residency) {
      return templateInstance.data.residency;
    }
  },
  newResidency() {
    const templateInstance = Template.instance();

    if (templateInstance.data.residency) {
      const {
        residentId,
        moveIn,
        _id,
      } = templateInstance.data.residency;
      /* If movin is after today move out and hence the movein for next
      residency is set to  the moveIn date. Otherwise the new moveIn/moveOut
      is today's date
      */
      const newMoveIn =
        moveIn.getTime() > new Date().getTime() ? moveIn : new Date();

      Residencies.update({ _id }, { $set: { moveOut: newMoveIn } });
      const newResidency = {
        residentId,
        newMoveIn,
        oldResidencyId: _id,
      };
      return newResidency;
    }
  },
  addNewResidencyClicked() {
    return Template.instance().addNewResidencyClicked.get();
  },
  residentIdOptions() {
    const templateInstance = Template.instance();

    return templateInstance.residentIdSelectOptions.get();
  },
  homeSelectOptionsWithGroups() {
    const templateInstance = Template.instance();

    return templateInstance.homeSelectOptionsWithGroups.get();
  },

  dismiss() {
    const parentTemplate = Template.instance();

    return () => {
      const { _id } = parentTemplate.data.residency;
      parentTemplate.addNewResidencyClicked.set(false);
      Residencies.update({ _id }, { $unset: { moveOut: true } });
    };
  },
});

Template.editResidencyModal.events({
  'click .add-new-residency-link'(event, templateInstance) {
    Template.instance().addNewResidencyClicked.set(true);
  },
});
