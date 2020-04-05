export const isCurrentUserAdmin = () =>
  Roles.userIsInRole(Meteor.userId(), ['admin']);
