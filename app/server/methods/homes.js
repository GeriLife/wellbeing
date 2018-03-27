import moment from 'moment';

Meteor.methods({
  'getHomeResidentIds': function (homeId) {
    // Get all residents of specific home
    var residents = Residents.find({'homeId': homeId}).fetch();

    // Create an array containing only resident IDs
    var residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    // return the resident IDs array
    return residentIds;
  },
  'getHomeCurrentResidentIds': function (homeId) {
    // Get all residents of specific home who are not departed
    var residents = Residents.find({'homeId': homeId, departed: false}, {sort: {firstName: 1}}).fetch();

    // Create an array containing only resident IDs
    var residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    // return the resident IDs array
    return residentIds;
  },
  'getHomeCurrentAndActiveResidentIds': function (homeId) {
    // Get all residents of specific home who are not departed or on hiatus
    const departed = false;
    const onHiatus = false;

    var residents = Residents.find(
      {'homeId': homeId, departed, onHiatus},
      {sort: {firstName: 1}}
    ).fetch();

    // Create an array containing only resident IDs
    const residentIds = _.map(residents, function (resident) {
      return resident._id;
    });

    // return the resident IDs array
    return residentIds;
  },
    'getHomeAllResidentIds': function (homeId) {
        var residents = Residents.find(
            {'homeId': homeId},
            {sort: {firstName: 1}}
        ).fetch();

        // Create an array containing only resident IDs
        var residentIds = _.map(residents, function (resident) {
            return resident._id;
        });

        // return the resident IDs array
        return residentIds;
    },
  'getHomeCurrentAndActiveResidentCount': function (homeId) {
    // Get all current residents for specific home (not departed or on hiatus)
    const homeCurrentResidentIds = Meteor.call("getHomeCurrentAndActiveResidentIds", homeId);

    // Count the length of current resident IDs list
    const homeCurrentResidentsCount = homeCurrentResidentIds.length;

    return homeCurrentResidentsCount;
  },
  'getHomeActivities': function (homeId, date= null) {
    // Get all resident of this home
    var homeResidentIds = Meteor.call('getHomeCurrentResidentIds', homeId);

    // Get an array of all activity Ids for residents of this home
    var homeResidentActivitiesQuery = Activities.find(
      {'residentIds': {$elemMatch: {$in: homeResidentIds}}},
      {sort: {activityDate: -1}}
    );

    // return all activities from activity IDs array
    var homeActivities = homeResidentActivitiesQuery.fetch();

    // Create a custom activities array using collection helpers
    // for resident names, activity type, and time ago
    var homeActivitiesArray = homeActivities.map(function (activity) {
      return {
        residents: activity.residentNames(),
        type: activity.activityType(),
        duration: activity.duration,
        activityDate: activity.activityDate
      }
    });

    return homeActivitiesArray;
  },
  'getHomeResidentsActivitySumsByType': function (homeId, date = null) {
    // Get all activity types
    const activityTypes = ActivityTypes.find({}, {sort: {name: 1}}).fetch();

    // Get all resident IDs
    var residentIds = Meteor.call('getHomeCurrentResidentIds', homeId);

    // Placeholder for all resident activity sums by type
    var allResidentActivitySumsByType = _.map(activityTypes, function (activityType) {
      // Create an object in the form of
      //  key: actiivtyType.name
      //  values: [
      //    {
      //      "label": "Resident Name",
      //      "value": activity count (integer)
      //    },
      //    ...
      //  ]

      var residentActivityCountsByCurrentType = {
        key: activityType.name,
        values: _.map(residentIds, function (residentId) {
          // Get resident
          var resident = Residents.findOne(residentId);

          // Get count of activities by current type for current resident
          var activityCount = Meteor.call("getSumOfResidentRecentActivitiesByType", residentId, activityType._id, date);

          // Placeholder object for resident name / activity count
          var residentActivityCount = {};

          if (activityCount > 0) {
            residentActivityCount = {
              "label": resident.fullName(),
              "value": activityCount
            };
          } else {
            residentActivityCount = {
              "label": resident.fullName(),
              "value": 0
            };
          }

          return residentActivityCount;
        })
      }

      return residentActivityCountsByCurrentType;
    });
    console.log(allResidentActivitySumsByType);
    return allResidentActivitySumsByType;
  },
  "getHomeActivityLevelCounts": function (homeId) {
    // // Get home residents by calling getHomeResidentIds
    var residentIds = Meteor.call("getHomeCurrentAndActiveResidentIds",homeId);

    var residentActivityLevelCounts = {
      inactive: 0,
      semiActive: 0,
      active: 0
    };

    if (residentIds){
      // Get count of recent active days for each resident
      _.each(residentIds, function (residentId) {
        const residentRecentActiveDaysCount = Meteor.call(
          "getResidentRecentActiveDaysCount",
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
  "getHomeActivityCountTrend": function (homeId) {
    // Get home residents
    var residentIds = Meteor.call("getHomeCurrentAndActiveResidentIds",homeId);

    // Placeholder array for daily activity level counts
    var activityCountsArray = [];

    // Date one week ago (six days, since today counts as one day)
    const startDate = moment().subtract(6, 'days');

    // Get a date object for the end of day today
    const endDate = moment().endOf('day');

    for (let currentDay = moment(startDate); currentDay.isBefore(endDate); currentDay.add(1, 'day')) {
      // Set up placeholder activity counts object
      var dailyActivityCounts = {
        date: currentDay.toDate(),
        inactive: 0,
        semiActive: 0,
        active: 0
      };

      // Get activity level for each resident
      // Compare it against the baseline
      _.each(residentIds, function (residentId) {
        var result = Meteor.call(
          "getResidentRecentActiveDaysCount",
          residentId,
          currentDay.toDate()
        );

        if (result === 0) {
          dailyActivityCounts.inactive += 1;
        } else if (result < 5 && result > 0) {
          dailyActivityCounts.semiActive += 1;
        } else if (result >= 5) {
          dailyActivityCounts.active += 1;
        };
      });

      // Add daily activity levels to activity counts array
      activityCountsArray.push(dailyActivityCounts);
    };

    return activityCountsArray;
  },
  getHomeSelectOptionsWithGroups () {
    // Get all Groups
    var groups = Groups.find().fetch();

    // Create an array of Group IDs
    var groupIDs = _.map(groups, function (group) {
      return group._id;
    });

    // Create select options for Homes input
    // Grouping homes by group
    var homeSelectOptionsWithGroups = _.map(groupIDs, function (groupId) {
      // Find the name of this group
      var groupName = Groups.findOne(groupId).name;

      // Get all homes of this group
      var groupHomes = Homes.find({groupId: groupId}).fetch();

      // Create a homes array with name/ID pairs for label/value
      var homesOptions = _.map(groupHomes, function (groupHome) {
        // Combine resident first name and last initial
        var homeName = groupHome.name;

        // Create option for this home, with home ID as the value
        return {label: homeName, value: groupHome._id};
      });

      // Return residents and home as option group
      return {optgroup: groupName, options: homesOptions};
    });

    return homeSelectOptionsWithGroups;
  },
});
