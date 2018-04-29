Meteor.publish("allUsers", function () {
  // Get all users
  var users = Meteor.users.find();

  return users;
});
