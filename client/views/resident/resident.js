Template.resident.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get Resident ID from router
  instance.residentId = Router.current().params.residentId;

  // Subscribe to current resident
  instance.subscribe('residentComposite', instance.residentId);

  // Subscribe to all roles except admin
  instance.subscribe("allRolesExceptAdmin");

  instance.activities = new ReactiveVar();
};

Template.resident.events({
  'click #edit-resident': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Show the edit home modal
    Modal.show('residentForm', {residentId: instance.residentId});
  },
  'click #add-activity': function () {
    // Show the Add Activity Modal
    Modal.show('newActivity');
  },
});

Template.resident.helpers({
  'resident': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get resident from template instance
    var resident = Residents.findOne(instance.residentId);

    return resident;
  },
  'activities': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get activities from template instance
    var activities = Activities.find({residentIds: instance.residentId}).fetch();

    return activities;
  }
})
