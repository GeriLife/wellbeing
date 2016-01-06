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
    console.log(users);
    return users;
  },
  email: function () {
		if (this.emails && this.emails.length) {
      return this.emails[0].address;
    }
  }    
});
