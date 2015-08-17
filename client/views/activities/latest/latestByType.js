Template.latestActivitiesByType.created = function () {
  // Create 'instance' variable for use througout template logic
  var instance = this;

  // Subscribe to all activity types
  instance.subscribe('allActivityTypes');

  // Create variable to hold activity type selection
  instance.activityTypeSelection = new ReactiveVar();
};

Template.latestActivitiesByType.helpers({
  'activityTypeOptions': function () {
    // Get all activity types
    activityTypes = ActivityTypes.find().fetch();

    return activityTypes;
  }
});
