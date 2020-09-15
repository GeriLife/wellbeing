const checkUserPermissions = function(
  type,
  action,
  userId,
  doc,
  hasDeparted,
  oldResidentRecord
) {
  let userIsAdministrator,
    isHomeManagedByUser = false;

  if (userId) {
    // Check if user is administrator
    userIsAdministrator = Roles.userIsInRole(userId, ["admin"]);

    // If user is not admin, check if he is manager
    if (!userIsAdministrator) {
      isHomeManagedByUser = Meteor.call("isHomeManagedByUser", {
        userId,
        homeId: doc.homeId
      });
    }
  }

  /* Check if current action is permitted */
  let canEdit = isHomeManagedByUser;

  // Managers cannot delete
  if (isHomeManagedByUser && action === "remove") {
    canEdit = false;
  }

  // Manager cannot update an inactive residency
  if (
    isHomeManagedByUser &&
    type === "residency" &&
    action === "update" &&
    hasDeparted
  ) {
    canEdit = false;
  }

  // Manager Can only update on Hiatus field

  // Checks if any other field except `onHiatus` was changed
  const hasResidentRecordChanged =
    (doc.firstName && oldResidentRecord.firstName !== doc.firstName) ||
    (doc.lastInitial && oldResidentRecord.lastInitial !== doc.lastInitial);
  
  if (
    isHomeManagedByUser &&
    type === "resident" &&
    action === "update" &&
    hasResidentRecordChanged
  ) {
    canEdit = false;
  }
  return userId && (userIsAdministrator || canEdit);
};

module.exports = {
  checkUserPermissions
};
