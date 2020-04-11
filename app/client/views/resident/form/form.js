Template.residentForm.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;
  templateInstance.residentDetails = new ReactiveVar();

  this.autorun(function () {
    // Check whether residentId was passed in to template data context
    if (templateInstance.data && templateInstance.data.residentId) {
      // Get resident ID
      const residentId = templateInstance.data.residentId;

      Meteor.call('getResidentDetails', residentId, function (
        err,
        resident
      ) {
        templateInstance.residentDetails.set(resident || {});
      });
    }
  });
});

Template.residentForm.helpers({
  resident() {
    // Get reference to template instance
    const templateInstance = Template.instance();
    return templateInstance.residentDetails.get();
  },
});

Template.residentForm.events({
  'click .btn-danger'() {
    FlashMessages.clear();
  },
});
