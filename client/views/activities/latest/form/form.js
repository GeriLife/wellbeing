Template.latestActivitiesByTypeSelectForm.events({
  'change #activity-type-select': function (event, template) {
    // Create instance variable for consistency
    var instance = Template.instance();

    // Get the selected activity type
    var selectedActivityType = event.target.value;

    // Set activity type selection variable in parent template
    instance.parent().activityTypeSelection.set(selectedActivityType);
  }
});

Template.latestActivitiesByTypeSelectForm.helpers({
  'activityTypeOptions': function () {
    // Get all activity types
    activityTypes = ActivityTypes.find().fetch();

    return activityTypes;
  }
});

Template.latestActivitiesByTypeSelectForm.created = function () {
  // Create instance variable for consistency
  var instance = this;

  // Subscribe to all activity types
  instance.subscribe('allActivityTypes');
};
