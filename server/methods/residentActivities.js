Meteor.methods({
  'getResidentRecentActivitiesCount': function (residentId) {
    // Date one week ago
    var oneWeekAgo = moment().subtract(1, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get a count of all resident activities within the desired time range
    var activityCount = Activities.find({
      'residentIds': residentId,
      activityDate: {$gte: oneWeekAgo, $lte: now}
    }).count();

    return activityCount;
  },
  'getResidentRecentActivityMinutes': function (residentId) {
    // Placeholder for activity minutes sum
    var activityMinutes = 0;

    // Date one week ago
    var oneWeekAgo = moment().subtract(1, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    var activities = Activities.find({'residentIds': residentId, activityDate: {$gte: oneWeekAgo, $lte: now}});

    // Add each activity duration to the total activity minutes
    activities.forEach(function (activity) {
      activityMinutes += activity.duration;
    });

    return activityMinutes;
  },
  'getResidentWeeklyActivitiesCountFromDate': function (residentId, date) {
    // Date to start activity range query
    var start = moment(date).subtract(1, "weeks").toDate();

    // Date to end activity range query
    var end = new moment(date).toDate();

    // Get a count of all resident activities within the desired time range
    var activityCount = Activities.find({
      'residentIds': residentId,
      activityDate: {$gte: start, $lte: end}
    }).count();

    return activityCount;
  },
  'getResidentsRecentActivityMinutesAndCountsByHome': function () {
    // Get all activity types
    // TODO: get only homes with Residents
    // This will prevent a chart bug on the Residents page
    var homes = Homes.find({}, {sort: {name: 1}}).fetch();

    // Placeholder for all resident activity sums by type
    var allResidentActivityMinutesAndCountsGroupedByHome = _.map(homes, function (home) {
      // Create an object in the form of
      //  key: Home name
      //  values: [
      //    {
      //      "label": "Resident Name",
      //      "activityCount": activity count (integer)
      //      "activityMinutes": activity minutes (integer)
      //    },
      //    ...
      //  ]

      // Get all home resident IDs
      var residentIds = Meteor.call('getHomeCurrentResidentIds', home._id);

      var residentActivityMinutesAndCountsByHome = {
        key: home.name,
        values: _.map(residentIds, function (residentId) {
          // Get resident
          var resident = Residents.findOne(residentId);

          // Get count of activities for current resident
          var recentActivityCount = Meteor.call("getResidentRecentActivitiesCount", resident._id);

          // Get recent activity minutes for current resident
          var recentActivityMinutes = Meteor.call("getResidentRecentActivityMinutes", resident._id);

          // Placeholder object for resident name / activity count
          var residentRecentActivityMinutesAndCountCount = {};


          residentRecentActivityMinutesAndCount = {
            "residentName": resident.fullName(),
            "recentActivityCount": recentActivityCount,
            "recentActivityMinutes": recentActivityMinutes
          };


          return residentRecentActivityMinutesAndCount;
        })
      }

      return residentActivityMinutesAndCountsByHome;
    });

    return allResidentActivityMinutesAndCountsGroupedByHome;
  }
});
