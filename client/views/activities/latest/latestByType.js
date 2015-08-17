Template.latestActivitiesByType.created = function () {
  // Create 'instance' variable for use througout template logic
  var instance = this;

  // Subscribe to all activity types
  instance.subscribe('allActivityTypes');

  // Create variable to hold activity type selection
  instance.activityTypeSelection = new ReactiveVar();

  // Create latest resident activity placeholder
  instance.latestResidentsActivityByType = new ReactiveVar();

  instance.autorun(function () {
    // Get activity type selection
    var activityTypeSelection = instance.activityTypeSelection.get();

    if (activityTypeSelection) {
      // Get latest resident activities for selected activity type
      Meteor.call(
        'getResidentsLatestActivityByType',
        activityTypeSelection,
        function (error, latestActivity) {
          if (error) {
            console.log(error);
          } else {
            // Update the reactive variable with latest resident activity
            instance.latestResidentsActivityByType.set(latestActivity);
          }
        });
    };
  });
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
