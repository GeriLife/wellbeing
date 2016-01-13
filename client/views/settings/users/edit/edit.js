Template.editUser.helpers({
  "formUser": function () {
    // Get reference to user from template context
    var user = this.data;

    // Create user object for edit form
    var formUser = {};

    if (user.roles){
      // Get reference to user roles
      var userRoles = user.roles;

      // Set form user isAdmin from user object
      formUser.isAdmin = _.contains(userRoles, "admin");
    } else {
      formUser.isAdmin = false;
    }

    // Set the form user ID
    formUser._id = user._id;

    // Set form user email from user object
    formUser.email = user.emails[0].address;

    // TODO: Clean up or return formUser code
    return formUser;
  }
});
Template.editUser.events({
  "submit #editUserForm": function (event) {
    // Prevent form from submitting with URL parameters
    event.preventDefault();
  }
});
