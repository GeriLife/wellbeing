Template.homeGroup.events({
  'click .home': function () {
    // Save Home ID that was clicked
    var homeId = this._id;

    // Show the page for individual home that was clicked
    Router.go('home', {homeId: homeId});
  }
});
