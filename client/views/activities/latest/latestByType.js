Template.latestActivitiesByType.created = function () {
  // Create 'instance' variable for use througout template logic
  var instance = this;

  // Create variable to hold activity type selection
  instance.activityTypeSelection = new ReactiveVar();

  // Create a reactive var to hold data containing latest activities by type
  instance.latestActivityIdsByTypeData = new ReactiveVar();

  Meteor.call('getAllResidentsLatestActivityIdsByType', function (error, latestResidentActivityIdsByType) {
    // Set latest activities by type
    instance.latestActivityIdsByTypeData.set(latestResidentActivityIdsByType);
  });
};

Template.latestActivitiesByType.helpers({
  'latestActivitiesByType': function () {
    // Get a reference to template instance
    var instance = Template.instance();

    var latestResidentActivityIdsByType = instance.latestActivityIdsByTypeData.get();

    //console.log(latestResidentActivitiesByType);
    if (latestResidentActivityIdsByType) {
      console.log(latestResidentActivityIdsByType);
      return latestResidentActivityIdsByType;
    } else {
      return [];
    }
  }
});
