Template.logout.events({
  'click #logout-button': function () {
    Meteor.logout();
  }
});
