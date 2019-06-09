const checkUserPermissions = function({
  schemaType,
  action,
  userId,
  doc,
  hasDeparted
}) {

  let userIsAdministrator;
  let isHomeManagedByUser = false;

  if (userId) {
    // Check if user is administrator
    userIsAdministrator = Roles.userIsInRole(userId, ["admin"]);

    if (!doc.homeId) return false;
    // If user is not admin, check if he is manager
    if (!userIsAdministrator) {
      isHomeManagedByUser = Meteor.call("isHomeManagedByUser", {
        userId,
        homeId: doc.homeId
      });
    }
  }

  /* Check if current action is permitted. 
     By default if the manager can edit,
     Except if the following conditions are not matched
    */
  let canEdit = isHomeManagedByUser;

  // Managers cannot delete
  if (isHomeManagedByUser && action === "remove") {
    canEdit = false;
  }

  // Manager cannot update an inactive residency
  if (
    isHomeManagedByUser &&
    schemaType === "residency" &&
    action === "update" &&
    hasDeparted
  ) {
    canEdit = false;
  }
  return userId && (userIsAdministrator || canEdit);
};

module.exports = {
  checkUserPermissions
};
