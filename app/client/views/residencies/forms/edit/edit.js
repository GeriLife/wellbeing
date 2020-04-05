import moment from 'moment';

Template.editResidencyModal.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // reactive placeholder for residentId select
  templateInstance.residentIdSelectOptions = new ReactiveVar();

  // reactive placeholder for home select options with groups
  templateInstance.homeSelectOptionsWithGroups = new ReactiveVar();
  templateInstance.addNewResidencyClicked = new ReactiveVar(false);
  templateInstance.newResidency = new ReactiveVar(null);

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
    return TAPi18n.__('residencies.note');
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
    return templateInstance.newResidency.get();
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
      Meteor.call(
        'editResidency',
        { _id, modifier: { $unset: { moveOut: true } } },
        function (err) {
          if (err) {
            FlashMessages.clear();
            FlashMessages.sendError(
              '<i class="fa fa-error"></i> ' + err.message,
              { autoHide: true, hideDelay: 3000 }
            );
            return;
          }
          parentTemplate.addNewResidencyClicked.set(false);
        }
      );
    };
  },
});

Template.editResidencyModal.events({
  'click .add-new-residency-link'(event, templateInstance) {
    if (templateInstance.data.residency) {
      const {
        residentId,
        moveIn,
        _id,
      } = templateInstance.data.residency;
      /* 
      Check if move-in date of current residency is after current date. If so 
      set the move out date to that very very day (= current moveIn date). In all other cases,
      set the move out date to today's date.
      */
      const newMoveIn =
        moveIn.getTime() > new Date().getTime()
          ? moment(moveIn).utc().format()
          : moment().utc().format();

      Meteor.call(
        'editResidency',
        { _id, modifier: { $set: { moveOut: newMoveIn } } },
        function (err) {
          if (err) {
            FlashMessages.clear();
            FlashMessages.sendError(
              '<i class="fa fa-error"></i> ' + err.message,
              { autoHide: true, hideDelay: 3000 }
            );
            return;
          }
          const newResidency = {
            residentId,
            newMoveIn,
            oldResidencyId: _id,
          };
          templateInstance.newResidency.set(newResidency);
          templateInstance.addNewResidencyClicked.set(true);
        }
      );
    }
  },
});
