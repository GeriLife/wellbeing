import moment from 'moment';

export const methods = {
  currentUserCanAccessHome(homeId) {
    const currentUserId = Meteor.userId();

    const home = Homes.findOne(homeId);

    if (!home) {
      return false;
    }

    const userGroupIds = Meteor.call(
      'getSingleUserGroupIds',
      currentUserId
    );

    const userIsInHomeGroup = userGroupIds.includes(home.groupId);

    const userIsAdmin = Roles.userIsInRole(currentUserId, ['admin']);

    if (userIsInHomeGroup || userIsAdmin) {
      return true;
    }

    return false;
  },
  getHomeResidentIds: function(homeId) {
    // Get all residents of specific home
    const residencies = Homes.find({ homeId }).fetch();
    return residencies.map(residency => residency.residentId);
  },
  getHomeCurrentResidencies(homeId) {
    /*
    Get all residencies for a home where the resident has not moved out. Get all residents of specific home who are not departed
     */
    return Residencies.find({
      homeId,
      moveOut: {
        $exists: false,
      },
    }).fetch();
  },
  getHomeCurrentResidentIds(homeId) {
    /*
    Get all resident IDs for a given home based on residency status.
     */
    const homeCurrentResidencies = Meteor.call(
      'getHomeCurrentResidencies',
      homeId
    );

    return _.map(homeCurrentResidencies, function(residency) {
      return residency.residentId;
    });
  },
  getHomeCurrentAndActiveResidentIds: function(homeId) {
    /*
    Get all residents of specific home who have an active residency and are not on hiatus
     */
    const onHiatus = false;

    const currentResidentIds = Meteor.call(
      'getHomeCurrentResidentIds',
      homeId
    );

    const residents = Residents.find(
      {
        _id: {
          $in: currentResidentIds,
        },
        onHiatus,
      },
      { sort: { firstName: 1 } }
    ).fetch();

    // Create an array containing only resident IDs
    return _.map(residents, function(resident) {
      return resident._id;
    });
  },
  getHomeCurrentAndActiveResidentCount: function(homeId) {
    // Get all current residents for specific home (not departed or on hiatus)
    const homeCurrentResidentIds = Meteor.call(
      'getHomeCurrentAndActiveResidentIds',
      homeId
    );

    // Count the length of current resident IDs list
    return homeCurrentResidentIds.length;

  },
  getHomeActivities: function(homeId) {
    // Get all resident of this home
    var homeResidentIds = Meteor.call(
      'getHomeCurrentResidentIds',
      homeId
    );

    // Get an array of all activity Ids for residents of this home
    var homeResidentActivitiesQuery = Activities.find(
      { residentIds: { $elemMatch: { $in: homeResidentIds } } },
      { sort: { activityDate: -1 } }
    );

    // return all activities from activity IDs array
    var homeActivities = homeResidentActivitiesQuery.fetch();

    // Create a custom activities array using collection helpers
    // for resident names, activity type, and time ago
    var homeActivitiesArray = homeActivities.map(function(activity) {
      return {
        residents: activity.residentNames(),
        type: activity.activityType(),
        duration: activity.duration,
        activityDate: activity.activityDate,
      };
    });

    return homeActivitiesArray;
  },
  getHomeActivityLevelCounts: function(homeId) {
    // // Get home residents by calling getHomeResidentIds
    var residentIds = Meteor.call(
      'getHomeCurrentAndActiveResidentIds',
      homeId
    );

    var residentActivityLevelCounts = {
      inactive: 0,
      semiActive: 0,
      active: 0,
    };

    if (residentIds) {
      // Get count of recent active days for each resident
      _.each(residentIds, function(residentId) {
        const residentRecentActiveDaysCount = Meteor.call(
          'getResidentRecentActiveDaysCount',
          residentId
        );

        // Check resident activity level
        if (residentRecentActiveDaysCount === 0) {
          // If zero activities, resident is inactive
          residentActivityLevelCounts.inactive += 1;
        } else if (residentRecentActiveDaysCount < 5) {
          // If less than five activities, resident is semi-active
          // TODO: refactor to use activity threshold variable
          residentActivityLevelCounts.semiActive += 1;
        } else if (residentRecentActiveDaysCount >= 5) {
          // If greater than or equal to five activities, resident is active
          // TODO: refactor to use activity threshold variable
          residentActivityLevelCounts.active += 1;
        }
      });
    }

    return residentActivityLevelCounts;
  },
  getHomeActivityCountTrend(homeId) {
    // Get home residents
    const residentIds = Meteor.call(
      'getHomeCurrentAndActiveResidentIds',
      homeId
    );

    // Arrays for daily activity level counts
    const inactivityCounts = [];
    const semiActivityCounts = [];
    const activityCounts = [];
    const date = [];

    // Date one week ago (six days, since today counts as one day)
    const startDate = moment().subtract(6, 'days');

    // Get a date object for the end of day today
    const endDate = moment().endOf('day');

    for (
      let currentDay = moment(startDate);
      currentDay.isBefore(endDate);
      currentDay.add(1, 'day')
    ) {
      // Set up placeholder activity counts object
      const dailyActivityCounts = {
        date: currentDay.toDate(),
        inactive: 0,
        semiActive: 0,
        active: 0,
      };

      // Get activity level for each resident
      // Compare it against the baseline
      _.each(residentIds, function(residentId) {
        const result = Meteor.call(
          'getResidentRecentActiveDaysCount',
          residentId,
          currentDay.toDate()
        );

        if (result === 0) {
          dailyActivityCounts.inactive += 1;
        } else if (result < 5 && result > 0) {
          dailyActivityCounts.semiActive += 1;
        } else if (result >= 5) {
          dailyActivityCounts.active += 1;
        }
      });

      // Add daily activity levels to activity counts arrays
      inactivityCounts.push(dailyActivityCounts.inactive);
      semiActivityCounts.push(dailyActivityCounts.semiActive);
      activityCounts.push(dailyActivityCounts.active);
      date.push(dailyActivityCounts.date);
    }

    return {
      activityCounts,
      inactivityCounts,
      semiActivityCounts,
      date,
    };
  },
  getHomeSelectOptionsWithGroups() {
    let allowedGroups = [];

    /* If user is admin */
    const userId = Meteor.userId();
    const userIsAdmin = Roles.userIsInRole(userId, 'admin');
    if (!userIsAdmin) {
      const permissions = Meteor.call(
        'getGroupsManagedByCurrentUser'
      );

      allowedGroups = (permissions || []).map(
        permission => permission.groupId
      );
    } else {
      // Get all Groups
      const groups = Groups.find().fetch();
      allowedGroups = _.map(groups, group => group._id);
    }

    // Create select options for Homes input
    // Grouping homes by group
    return _.map(allowedGroups, function(
      groupId
    ) {
      // Find the name of this group
      var groupName = Groups.findOne(groupId).name;

      // Get all homes of this group
      var groupHomes = Homes.find({ groupId: groupId }).fetch();

      // Create a homes array with name/ID pairs for label/value
      var homesOptions = _.map(groupHomes, function(groupHome) {
        // Combine resident first name and last initial
        var homeName = groupHome.name;

        // Create option for this home, with home ID as the value
        return { label: homeName, value: groupHome._id };
      });

      // Return residents and home as option group
      return { optgroup: groupName, options: homesOptions };
    });
  },
  getUserVisibleHomeIds(userId) {
    const selector = {};

    const userIsAdmin = Roles.userIsInRole(userId, 'admin');

    // non-admin should see only homes belonging to assigned permission group(s)
    if (!userIsAdmin) {
      const userPermissions = Permissions.find({ userId }).fetch();

      const userGroups = userPermissions.map(
        permission => permission.groupId
      );

      selector.groupId = { $in: userGroups };
    }

    return Homes.find(selector).map(home => home._id);
  },

  assignManager({ groupId, users }) {
    // Get current user ID
    const currentUserId = Meteor.userId();

    // Check if current user is Admin
    const currentUserIsAdmin = Roles.userIsInRole(
      currentUserId,
      'admin'
    );
    if (!currentUserIsAdmin)
      throw new Meteor.Error(
        500,
        'User does not have right to perform this action'
      );

    // If groupId is not specified
    if (!groupId) throw new Meteor.Error(500, 'Group not specified');
    if (users && users.length > 0) {
      /* Even if permission for one user is not updated it will return false */
      const allPermissionsUpdated = users.every(userId => {
        try {
          /* rowsUpdated=0 means no rows updated */
          const rowsUpdated = Permissions.update(
            {
              groupId,
              userId,
            },
            {
              $set: { isManager: true },
            },
            { upsert: true }
          );
          return rowsUpdated >= 0;
        } catch (error) {
          throw new Meteor.Error(500, error.toString());
        }
      });
      if (!allPermissionsUpdated)
        throw new Meteor.Error(
          500,
          'Could not update all permissions'
        );
      return allPermissionsUpdated;
    } else {
      /* If user array is empty */
      throw new Meteor.Error(500, 'Users not selected.');
    }
  },

  getCurrentManagers(groupId) {
    const ManagerPermissionRecords = Permissions.find({
      groupId,
      isManager: true,
    });
    if (!ManagerPermissionRecords) return ManagerPermissionRecords;
    else {
      const userIds = ManagerPermissionRecords.map(
        permissionRecord => permissionRecord.userId
      );
      const userInformation = Meteor.users.find({
        _id: { $in: userIds },
      });
      if (!userInformation) return userInformation;
      else {
        let userWithEmailAddress = [];
        userWithEmailAddress = userInformation.map(userDetail => {
          return {
            userId: userDetail._id,
            address: userDetail.emails[0].address,
          };
        });
        return userWithEmailAddress;
      }
    }
  },
  isHomeManagedByUser({ userId, homeId }) {
    const home = Homes.findOne({ _id: homeId });

    if (home) {
      const permission = Permissions.findOne({
        $and: [
          { userId },
          { groupId: home.groupId },
          { isManager: true },
        ],
      });

      /* If a permission with manager rights exists return true. */
      return !!permission;
    }
    return false;
  },
  getActivityPercentageForAGivenHome(homeId) {
    // Get count of home current residents (not departed or on hiatus)
    const homeCurrentResidentsCount = Meteor.call(
      'getHomeCurrentAndActiveResidentCount',
      homeId
    );

    // Retrieve home resident activity level counts from server
    const activityLevelCounts = Meteor.call(
      'getHomeActivityLevelCounts',
      homeId
    );

    // Make sure activity level counts exist
    if (
      activityLevelCounts &&
      homeCurrentResidentsCount !== undefined
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
            (activityLevelCounts[type] / homeCurrentResidentsCount) *
              100
          );
        }
        // Construct an object with the type and count keys
        return {
          // Activity level class (inactive, semi-active, active)
          type: type,
          // Number of residents in activity class
          count: activityLevelCounts[type],
          // Percentage of home residents fallint into activity level class
          homePercentage: homePercentage,
        };
      });
    }
    return [];
  },
};

Meteor.methods(methods);