Template.resident.created = function () {
  // Get reference to template instance
  var instance = this;

  instance.residentId = Router.current().params.residentId;

  // Subscribe to current resident
  instance.subscribe('residentComposite', instance.residentId);
};

Template.resident.events({
  'click #edit-resident': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get Home ID
    var residentId = instance.residentId;

    // Get home
    var resident = Residents.findOne(residentId);

    // Show the edit home modal
    Modal.show('editResident', resident);
  }
});

Template.resident.helpers({
  'resident': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get Resident ID from template instance
    var residentId = instance.residentId;

    // Get resident from colleciton by Resident ID
    var resident = Residents.findOne(residentId);

    return resident;
  }
})
