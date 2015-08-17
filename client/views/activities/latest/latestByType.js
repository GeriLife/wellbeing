Template.latestActivitiesByType.created = function () {
  // Create 'instance' variable for use througout template logic
  var instance = this;

  // Subscribe to all activity types
  instance.subscribe('allActivityTypes'); 
};

Template.latestActivitiesByType.helpers({
  'activityTypeOptions': function () {
    // Get all activity types
    activityTypes = ActivityTypes.find().fetch();

    return activityTypes;
  }
});
