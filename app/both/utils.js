export const checkUserPermissions = function({
  schemaType,
  action,
  userId,
  doc,
  hasDeparted,
}) {
  let userIsAdministrator;
  let isHomeManagedByUser = false;
  if (!userId) return false;

  // Check if user is administrator
  userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
  if (userIsAdministrator) return true;

  if (!doc.homeId) return false;

  // If user is not admin, check if he is manager
  isHomeManagedByUser = Meteor.call('isHomeManagedByUser', {
    userId,
    homeId: doc.homeId,
  });

  /* Check if current action is permitted.
     By default if the manager can edit,
     Except if the following conditions are not matched
    */
  let canEdit = isHomeManagedByUser;

  // Managers cannot delete
  if (isHomeManagedByUser && action === 'remove') {
    canEdit = false;
  }

  // Manager cannot update an inactive residency
  if (
    isHomeManagedByUser &&
    schemaType === 'residency' &&
    action === 'update' &&
    hasDeparted
  ) {
    canEdit = false;
  }
  return canEdit;
};

export const getActiveResidency = function(residentId) {
  return Residencies.findOne({
    $and: [
      {
        residentId,
      },
      {
        moveOut: {
          $exists: false,
        },
      },
    ],
  });
};
