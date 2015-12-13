Template.homes.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to all homes
  instance.subscribe('allHomes');

  // Subscribe to all groups
  instance.subscribe('allGroups');
};

Template.homes.events({
  'click #new-home': function () {
    // Show the edit home modal
    Modal.show('newHome');
  },
  'click #new-group': function () {
    // Show the edit home modal
    Modal.show('newGroup');
  },
  'click .home': function () {
    // Save Home ID that was clicked
    var homeId = this._id;

    // Show the page for individual home that was clicked
    Router.go('home', {homeId: homeId});
  }
});

Template.homes.helpers({
  'groups': function () {
    // Get all Groups
    return Groups.find();
  }
});
