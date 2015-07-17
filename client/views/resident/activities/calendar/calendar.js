Template.activityCalendar.rendered = function () {
  // Get current resident ID
  var residentId = this.data._id;

  // Get all activities for current resident
  var residentActivities = Residents.findOne(residentId).activities().fetch();

  // Create an array of activities with properly formatted timestamps
  var timestampedActivities = _.map(residentActivities, function (activity) {
    // Create empty placeholder object
    var activityObject = {};

    // Timestamp the activity
    activityObject.timestamp = activity.activityDate.getTime();

    // Set activity duration
    activityObject.duration = activity.duration;

    return activityObject;
  })

  // Set up the activity map graphic
  var activityMap = new ActivityMap(timestampedActivities, {
    "id": "#activity-calendar",
    "parent": "#activity-calendar-container",
    "title": "Activity Calendar ",
    "timeColumn": "timestamp",
    "valueColumn": "duration"
  });
  
  // Render the activity map
  activityMap.render();
}
