Template.editActivity.onCreated(function () {
  // Get reference to template instance
  var instance = this;

  instance.subscribe('allCurrentResidents');
  instance.subscribe('allHomes');
  instance.subscribe('allActivityTypes');
  instance.subscribe('allRolesExceptAdmin');

  // Get Activity ID from data context
  var activityId = instance.data.activityId;

  // Subscribe to single activity
  instance.subscribe("singleActivity", activityId);
});

Template.editActivity.helpers({
  "activity": function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Get Activity ID from instance
    var activityId = instance.data.activityId;
    console.log(instance.data.activityId);
    // Get the Activity document
    var activity = Activities.findOne(activityId);
    //console.log(activity);

    // Get the Activity data
    return activity;
  }
});
