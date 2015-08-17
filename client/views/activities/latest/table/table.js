Template.latestActivitiesByTypeTable.helpers({
  tableData: function () {
    // Columns resident name, timeAgo
    return [];
  }
});

Template.latestActivitiesByTypeTable.created = function () {
  // Set instance variable for consistency
  instance = Template.instance();

  instance.autorun(function () {
    // Keep track of the selected activity type
    var latestResidentActivities = instance.parent().latestResidentsActivityByType.get();

    var residentIds = _.map(latestResidentActivities, function (residentActivity) {
      // Get the resident ID
      return residentActivity._id;
    });

    // Get residents from database
    instance.subscribe('selectResidents', residentIds);
  });
};
