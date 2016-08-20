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

  instance.autorun(function () {
    if (instance.subscriptionsReady()) {
      instance.resident = Residents.findOne(instance.residentId);

      var residentActivities = Activities.find({residentIds: instance.residentId}).fetch();

      instance.activities.set(residentActivities);
    }
  });
};

Template.resident.events({
  'click #edit-resident': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Show the edit home modal
    Modal.show('editResident', instance.resident);
  }
});

Template.resident.helpers({
  'resident': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get resident from template instance
    var resident = instance.resident;

    return resident;
  },
  'activities': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get activities from template instance
    var activities = instance.activities.get();

    return activities;
  }
})
