Meteor.publish("allRoles", function () {
  // Return all roles
  return Meteor.roles.find();
});

Meteor.publish("allRolesExceptAdmin", function () {
  // Get all roles except 'admin'
  var roles = Meteor.roles.find({name: {$ne: "admin"}});

  return roles;
})
