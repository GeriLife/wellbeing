Template.singleHomeActivityStatus.helpers({
  "activityLevelCounts": function () {
    // Get home residents by calling getHomeResidentIds
    // Get activity level for each resident via getResidentRecentActivitiesCount
    // Construct an object with the following structure
    var counts ={
      inactive: 5,
      semiActive: 3,
      active: 2
    };

    return counts;
  }
});
