Meteor.publish("allUsers", function () {
  var currentUserId = Meteor.userId();
  
  // Check if current user has Admin role
  var currentUserIsAdmin = Roles.userIsInRole(currentUserId, [
    "admin"
  ]);

  let users = [];

  if(currentUserIsAdmin){
    // Get all users
     users = Meteor.users.find();
  }

  return users;
});
