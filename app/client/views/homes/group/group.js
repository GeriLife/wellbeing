Template.homeGroup.events({
  'click .edit-group' () {
    // Get reference to group
    const group = this;

    // Show the group modal (edit)
    Modal.show('groupModal', { group });
  },
  'click .new-home' () {
    // Get reference to group ID
    const groupId = this._id;

    // Show the edit home modal, passing in group ID
    Modal.show('newHome', { groupId });
  },
  'click .viewHome' () {
    // Save Home ID that was clicked
    const homeId = this._id;

    // Show the page for individual home that was clicked
    Router.go('home', {homeId: homeId});
  },
  'click .homeReport' () {
    // Save Home ID that was clicked
    const homeId = this._id;

    // Show the page for individual home that was clicked
    Router.go('homeReport', {homeId: homeId});
  }
});
