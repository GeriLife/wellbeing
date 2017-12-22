Template.newUser.events({
  "submit #newUserForm": function (event) {
    // Prevent form from submitting with URL parameters
    event.preventDefault();
  }
});
