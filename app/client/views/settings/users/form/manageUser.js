import { NewUserSchema } from './newUserSchema';
import { EditUserSchema } from './editUserSchema';

Template.manageUser.onCreated(function() {
  const templateInstance = this;
  const user = this.data;
  const isEdit = user && !!user._id;
  templateInstance.isEdit = new ReactiveVar(isEdit);

  // adding to as autoform expects schema in the browser window variable
  if (isEdit) {
    window.userSchema = EditUserSchema;
  } else {
    window.userSchema = NewUserSchema;
  }
});
Template.manageUser.helpers({
  formUser: function() {
    const isEdit = Template.instance().isEdit.get();
    if (!isEdit) return {};
    // Get reference to user from template context
    const user = this;

    // Create user object for edit form
    const formUser = {};

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
    /* In create mode always show checkbox */
    const isEdit = Template.instance().isEdit.get();
    if (!isEdit) return true;

    // Is current user admin
    const currentUserId = Meteor.userId();
    const isAdmin = Roles.userIsInRole(currentUserId, 'admin');

    // Get current user email.
    const currentUserEmail = Meteor.user().emails[0].address;
    const user = this;

    // disable if current user is admin and editing his own info
    return !(currentUserEmail === user.emails[0].address && isAdmin);
  },

  isEdit() {
    return Template.instance().isEdit.get();
  },
});
Template.manageUser.events({
  'submit #userForm': function(event) {
    // Prevent form from submitting with URL parameters
    event.preventDefault();
  },
});
