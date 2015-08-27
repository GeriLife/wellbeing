Template.latestActivitiesByType.created = function () {
  // Create 'instance' variable for use througout template logic
  var instance = this;

  // Create variable to hold activity type selection
  instance.activityTypeSelection = new ReactiveVar();

  // Create a reactive var to hold data containing latest activities by type
  instance.latestActivitiesByTypeData = new ReactiveVar();

  Meteor.call('getAllResidentsLatestActivitiesByType', function (error, latestResidentActivitiesByType) {
    // Set latest activities by type
    instance.latestActivitiesByTypeData.set(latestResidentActivitiesByType);
  });
};

Template.latestActivitiesByType.helpers({
  'latestActivitiesByType': function () {
    // Get a reference to template instance
    var instance = Template.instance();

    var latestResidentActivitiesByType = instance.latestActivitiesByTypeData.get();

    //console.log(latestResidentActivitiesByType);
    if (latestResidentActivitiesByType) {
      return latestResidentActivitiesByType;
    } else {
      return [];
    }
  }
});
