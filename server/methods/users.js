Meteor.methods({
  "addUser": function (user) {
    // Add new user
    var userId = Accounts.createUser(user);

    return userId;
  }
});
