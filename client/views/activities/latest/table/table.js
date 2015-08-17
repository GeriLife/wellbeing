Template.latestActivitiesByTypeTable.helpers({
  tableData: function () {
    // Set instance variable for consistency
    var instance = Template.instance();

    var latestResidentActivities = instance.parent().latestResidentsActivityByType.get();

    if (latestResidentActivities) {
      return latestResidentActivities;
    } else {
      return [];
    }
  }
});

Template.latestActivitiesByTypeTable.created = function () {
  // Set instance variable for consistency
  instance = Template.instance();

  instance.autorun(function () {

  });
};
