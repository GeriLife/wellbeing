Template.homeGroup.onCreated(function () {
  const templateInstance = this;
  const groupId = templateInstance.data._id;

  templateInstance.homes = new ReactiveVar(null);
  this.autorun(function () {
    const refreshFlag = Session.get('refresh-data');
    if (refreshFlag) {
      Session.set('refresh-data', true);
    }

    Meteor.call('getGroupHomes', groupId, function (err, homesList) {
      if (!err) {
        templateInstance.homes.set(homesList);
      }
    });
  });
});

Template.homeGroup.events({
  "click .edit-group"() {
    // Get reference to group
    const group = this;

    // Show the group modal (edit)
    Modal.show("groupModal", { group });
  },
  "click .new-home"() {
    // Get reference to group ID
    const groupId = this._id;

    // Show the edit home modal, passing in group ID
    Modal.show("newHome", { groupId });
  },
  "click .assign-manager"() {
    // Get reference to group ID
    const groupId = this._id;

    // Show the edit home modal, passing in group ID
    Modal.show("assignManager", { groupId });
  },
  "click .viewHome"() {
    // Save Home ID that was clicked
    const homeId = this._id;

    // Show the page for individual home that was clicked
    Router.go("home", { homeId: homeId });
  },
  "click .homeReport"() {
    // Save Home ID that was clicked
    const homeId = this._id;

    // Show the page for individual home that was clicked
    Router.go("homeReport", { homeId: homeId });
  }
});

Template.homeGroup.helpers({
  sortedHomes() {
    return Template.instance().homes.get();
  },
});
