export const isCurrentUserAdmin = (userId) =>
  Roles.userIsInRole(userId || Meteor.userId(), ['admin']);
