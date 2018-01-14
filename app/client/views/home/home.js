Template.home.onCreated(function () {
  const instance = this;
  instance.date = new ReactiveVar();
  // Set current Home ID from router
  instance.homeId = Router.current().params.homeId;

  // Subscribe to current home
  instance.subscribe('singleHome', instance.homeId);

  // Subscribe to Home Residents
  instance.subscribe('homeCurrentResidents', instance.homeId);
  instance.date.set(new Date())

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
  },
    'change #datepicker, paste #datepicker, keyup #datepicker, mouseup #datepicker': function (event, template) {
      let datepicker = $("#datepicker").data('datepicker')
        if (datepicker) {
            const value = $("#datepicker").data('datepicker').getDate();
            if (value) {
                template.date.set(value);
            }
        }
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
    return Residents.find({'homeId': homeId}, {sort: {firstName: 1}});
  },
    'date': function() {
        const instance = Template.instance();
        return instance.date;
    }
});


