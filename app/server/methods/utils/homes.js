import { isCurrentUserAdmin } from '../../utils/user';
export const getCurrentManagers = function(groupId) {
  /* Do nothing if already a manager */
  const ManagerPermissionRecords = Permissions.find({
    groupId,
    isManager: true,
  });
  if (!ManagerPermissionRecords) return ManagerPermissionRecords;

  /* Check if a valid user for all user ids exists */
  const userIds = ManagerPermissionRecords.map(
    permissionRecord => permissionRecord.userId
  );
  const userInformation = Meteor.users.find({
    _id: { $in: userIds },
  });
  if (!userInformation) return userInformation;
  let userWithEmailAddress = [];

  /* Return users */
  userWithEmailAddress = userInformation.map(userDetail => {
    return {
      userId: userDetail._id,
      address: userDetail.emails[0].address,
    };
  });
  return userWithEmailAddress;
};

export const activityLevelPercentage = function(
  homeCurrentResidentsCount,
  activityLevelCounts
) {
  /*
        Re-structure activity level counts data to an object containing:
        type: the type of activity level (inactive, semiActive, active)
        count: the number of residents with a given activity level
        homePercentage: percentage of home residents with the activity level
        */
  const activityLevelTypes = _.keys(activityLevelCounts);

  return activityLevelTypes.map(function(type) {
    // Default value is 0
    let homePercentage = 0;
    // Avoid dividing by 0
    if (homeCurrentResidentsCount !== 0) {
      // Calculate the percentage of home residents in activity level class
      homePercentage = Math.round(
        (activityLevelCounts[type] / homeCurrentResidentsCount) * 100
      );
    }
    return {
      // Activity level class (inactive, semi-active, active)
      type: type,
      // Number of residents in activity class
      count: activityLevelCounts[type],
      // Percentage of home residents fallint into activity level class
      homePercentage: homePercentage,
    };
  });
};

export const makeUserManager = function (groupId, userId, currentUser) {
  if (!isCurrentUserAdmin(currentUser)) {
    throw new Meteor.Error(500, 'Operation not allowed');
  }

  return Permissions.update(
    {
      groupId,
      userId,
    },
    {
      $set: { isManager: true },
    },
    { upsert: true }
  );
};
