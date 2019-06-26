Template.editUser.helpers({
  formUser: function() {
    // Get reference to user from template context
    var user = this.data;

    // Create user object for edit form
    var formUser = {};

    if (user.roles) {
      // Get reference to user roles
      var userRoles = user.roles;

      // Set form user isAdmin from user object
      formUser.isAdmin = _.contains(userRoles, 'admin');
    } else {
      formUser.isAdmin = false;
    }

    // Set the form user ID
    formUser._id = user._id;

    // Set form user email from user object
    formUser.email = user.emails[0].address;

    // Deactivation date
    formUser.deactivateOn = user.deactivateOn;

    // User account status
    formUser.isActive = user.isActive;

    // TODO: Clean up or return formUser code
    return formUser;
  },

  showIsAdminCheckBox() {
    // Is current user admin
    const currentUserId = Meteor.userId();
    const isAdmin = Roles.userIsInRole(currentUserId, 'admin');

    // Get current user email.
    const currentUserEmail = Meteor.user().emails[0].address;
    const user = this.data;

    // disable if current user is admin and editing his own info
    return !(currentUserEmail === user.emails[0].address && isAdmin);
  },
});
Template.editUser.events({
  'submit #editUserForm': function(event) {
    // Prevent form from submitting with URL parameters
    event.preventDefault();
  },
});
