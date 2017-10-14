Template.resident.onCreated(function () {
  // Get reference to template instance
  var instance = this;

  // Get Resident ID from router
  instance.residentId = Router.current().params.residentId;

  // Subscribe to current resident
  instance.subscribe('residentComposite', instance.residentId);

  // Subscribe to all roles except admin
  instance.subscribe("allRolesExceptAdmin");

  instance.activities = new ReactiveVar();
});

Template.resident.events({
  'click #edit-resident' () {
    // Get reference to template instance
    var templateInstance = Template.instance();

    // Show the edit home modal
    Modal.show('residentForm', {residentId: templateInstance.residentId});
  },
  'click #add-activity' (event, templateInstance) {
    // Show the Add Activity Modal
    // Pass in resident ID (to be automatically selected on form)
    // note: form field is 'residentIds' (plural)
    Modal.show('newActivity', { residentIds: templateInstance.residentId });
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
    var templateInstance = Template.instance();

    // Get resident from template instance
    var resident = Residents.findOne(templateInstance.residentId);

    return resident;
  },
  'activities' () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get activities from template instance
    var activities = Activities.find({residentIds: templateInstance.residentId}).fetch();

    return activities;
  }
})
