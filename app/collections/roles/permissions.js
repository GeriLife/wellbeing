Meteor.roles.allow({
  "insert": function (userId) {
    // Only Administrators can insert
    return Roles.userIsInRole(userId, ['admin']);
  }
});
