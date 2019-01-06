Template.resident.onCreated(function () {
  const templateInstance = this;

  // used to pass all resident activities into some charts
  templateInstance.activities = new ReactiveVar();

  // Get Resident ID from router
  templateInstance.residentId = Router.current().params.residentId;

  // Subscribe to current resident
  templateInstance.subscribe('residentProfileComposite', templateInstance.residentId);

  // Subscribe to all roles except admin
  templateInstance.subscribe("allRolesExceptAdmin");
});


Template.resident.events({
  'click #edit-resident' () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Show the edit home modal
    Modal.show('residentForm', {residentId: templateInstance.residentId});
  },
  'click #add-activity' (event, templateInstance) {
    // Show the Add Activity Modal
    // Pass in resident ID (to be automatically selected on form)
    // note: form field is 'residentIds' (plural)
    Modal.show('activityFormModal', { residentIds: templateInstance.residentId });
  },
  'click #add-feeling' (event, templateInstance) {
    // Show the New Feeling modal
    // Pass in resident ID (to be automatically selected on form)
    Modal.show('newFeeling', { residentId: templateInstance.residentId });
  },
});

Template.resident.helpers({
  'resident' () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get resident from template instance
    const resident = Residents.findOne(templateInstance.residentId);

    return resident;
  },
  'activities' () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get activities from template instance
    const activities = Activities.find({residentIds: templateInstance.residentId}).fetch();

    return activities;
  },
});
