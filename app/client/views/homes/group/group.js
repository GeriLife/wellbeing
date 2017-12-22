Template.homeGroup.events({
  'click .edit-home' () {
    // Get reference to group
    const group = this;

    // Show the group modal (edit)
    Modal.show('groupModal', { group });
  },
  'click .home' () {
    // Save Home ID that was clicked
    var homeId = this._id;

    // Show the page for individual home that was clicked
    Router.go('home', {homeId: homeId});
  }
});
