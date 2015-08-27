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

    // Create an array of activities
    var activities = _.map(latestResidentActivityIdsByType, function (activityId) {
      // Find a single activity by ID
      var activity = Activities.findOne(activityId);

      return activity;
    });

    // If activities exist
    if (activities) {
      // Return the activities to template
      return activities;
    } else {
      // Return an empty array
      return [];
    }
  }
});
