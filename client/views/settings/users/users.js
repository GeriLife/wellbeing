Template.usersSettings.created = function () {
  // Get reference to Template instance
  var instance = this;

  // Subscribe to all users
  instance.subscribe("allUsers");
};

Template.usersSettings.helpers({
  "users": function () {
    // Get all users
    var users = Meteor.users.find().fetch();

    return users;
  },
  "email": function () {
    if (this.emails && this.emails.length) {
      // Return the user's first email address
      return this.emails[0].address;
    }
  },
  "roles": function () {
    if (this.roles && this.roles.length) {
      // Return comma separated list of roles
      return this.roles.join();
    }
  },
  tableSettings () {
    const tableSettings = {
      fields: [
        'emails.0.address',
        'emails.0.verified',
        'roles',
      ]
    };

    return tableSettings;
  },
  usersCollection () {
    // Return users collection
    return Meteor.users;
  },
  "userCanDeleteAccount": function () {
    // Prevent user from deleting own account
    // by hiding delete button

    // get logged in user ID
    const loggedInUserId = Meteor.userId();

    // get users table user id
    const tableUserId = this._id;

    if (loggedInUserId !== tableUserId) {
      // logged in user different from table user
      // so, allow delete
      return true;
    }

    // otherwise, don't allow delete (hide button)
    return false;
  }
});

Template.usersSettings.events({
  'click #add-user': function () {
    // Show the add activity modal
    Modal.show('newUser');
  },
  'click .delete-user': function (event, template) {
    // Save reference to user
    var user = this;

    // Show edit modal, passing in user as data context
    Modal.show("deleteUser", {"data": user}, {});
  },
  'click .edit-user': function (event, template) {
    // Save reference to user
    var user = this;

    // Show edit modal, passing in user as data context
    Modal.show("editUser", {"data": user}, {});
  }
});
