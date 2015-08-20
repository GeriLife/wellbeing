Template.home.helpers({
  'residents': function () {
    var instance = Template.instance();

    // Get all residents for current home
    var homeId = instance.homeId;

    return Residents.find({'homeId': homeId});
  }
});

Template.home.created = function () {
  var instance = this;

  // Set current Home ID from router
  instance.homeId = Router.current().params.homeId;

  // Subscribe to current home
  instance.subscribe('singleHome', homeId);
};
