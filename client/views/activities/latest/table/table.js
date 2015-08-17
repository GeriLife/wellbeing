Template.latestActivitiesByTypeTable.helpers({
  tableData: function () {
    // Set instance variable for consistency
    var instance = Template.instance();

    // Get the parent template
    var parent = instance.parent();

    // Get latest residents activity from parent template
    var latestResidentActivities = parent.latestResidentsActivityByType.get();

    if (latestResidentActivities) {
      return latestResidentActivities;
    }

    // Columns name, timeAgo
  }
});
