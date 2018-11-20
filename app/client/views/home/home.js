Template.home.onCreated(function () {
  const instance = this;

  // Set current Home ID from router
  instance.homeId = Router.current().params.homeId;

  // Subscribe to current home
  instance.subscribe('singleHome', instance.homeId);

  // Subscribe to Home Residents
  instance.subscribe('homeCurrentResidents', instance.homeId);
});

Template.home.events({
  'click #edit-home': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get Home ID
    var homeId = instance.homeId;

    // Get home
    var home = Homes.findOne(homeId);

    // Show the edit home modal
    Modal.show('editHome', home);
  }
});

Template.home.helpers({
  'home': function () {
    // Create reference to template instance
    var instance = Template.instance();

    // Get Home ID from template instance
    var homeId = instance.homeId;

    // Return current Home
    return Homes.findOne(homeId);
  },
  'residents': function () {
    // Create reference to template instance
    var instance = Template.instance();

    // Get Home ID from template instance
    var homeId = instance.homeId;

    // Return all residents for current home, sorting by first name
    return Residents.find({}, {sort: {firstName: 1}});
  }
});
