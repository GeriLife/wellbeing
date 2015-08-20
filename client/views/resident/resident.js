Template.resident.created = function () {
  // Get reference to template instance
  var instance = this;

  instance.residentId = Router.current().params.residentId;

  instance.subscribe('singleResident', instance.residentId);
};

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
