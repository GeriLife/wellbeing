Template.home.onCreated(function () {
  const templateInstance = this;

  // Set current Home ID from router
  templateInstance.homeId = Router.current().params.homeId;

  // Subscribe to current home
  templateInstance.subscribe('singleHome', templateInstance.homeId);

  // Subscribe to Home Residents
  templateInstance.subscribe('homeCurrentResidents', templateInstance.homeId);
});

Template.home.events({
  'click #edit-home': function () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get Home ID
    const homeId = templateInstance.homeId;

    // Get home
    const home = Homes.findOne(homeId);

    // Show the edit home modal
    Modal.show('editHome', home);
  }
});

Template.home.helpers({
  'home': function () {
    // Create reference to template instance
    const templateInstance = Template.instance();

    // Get Home ID from template instance
    const homeId = templateInstance.homeId;

    // Return current Home
    return Homes.findOne(homeId);
  },
  'residents': function () {
    // Return all residents for current home, sorting by first name
    //NOTE: these should be filtered by the subscription, as they are dependent on residency status
    return Residents.find({}, {sort: {firstName: 1}});
  }
});
