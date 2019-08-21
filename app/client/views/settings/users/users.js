Template.usersSettings.events({
  'click #add-user'() {
    // Show the add activity modal
    Modal.show('manageUser', {}, {});
    FlashMessages.clear();
  },
});
