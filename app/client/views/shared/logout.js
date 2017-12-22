Template.logout.events({
  'click #logout-button': function (event, template) {
    // Prevent form submission
    event.preventDefault();

    // Log out user
    Meteor.logout();
  }
});
