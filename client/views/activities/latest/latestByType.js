Template.latestActivitiesByType.created = function () {
  // Create 'instance' variable for use througout template logic
  var instance = this;

  // Subscribe to all activity types
  instance.subscribe('allActivityTypes');

  // Create variable to hold activity type selection
  instance.activityTypeSelection = new ReactiveVar();

  // Create latest resident activity placeholder
  instance.latestResidentsActivityByType = new ReactiveVar();
};

Template.latestActivitiesByType.helpers({
  'activityTypeOptions': function () {
    // Get all activity types
    activityTypes = ActivityTypes.find().fetch();

    return activityTypes;
  }
});

Template.latestActivitiesByType.events({
  'change #activity-type-select': function (event, template) {
    // Create instance variable for consistency
    var instance = Template.instance();

    var selectedActivityType = event.target.value;

    instance.activityTypeSelection.set(selectedActivityType);
  }
});
