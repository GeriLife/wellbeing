Template.activityCalendar.rendered = function () {
  // Get current resident ID
  var residentId = this.data._id;

  // Get all activities for current resident
  var residentActivities = Residents.findOne(residentId).activities().fetch();

  // Create a nest of activities grouped by activity date
  var nestedActivities = d3.nest()
    .key(function (activity) {
      return activity.activityDate;
    })

  // Get a sum of activities
  var summedActivities = nestedActivities.rollup(function (activity) {
      return {
        duration: d3.sum(activity, function (activity) {
          return activity.duration;
        })
      }
    })
    .entries(residentActivities);

    summedActivities.map(function (activity) {
      // Create date and duration attributes with proper data types
      activity.timestamp = new Date(activity.key).getTime();
      activity.duration = parseInt(activity.values.duration);

      // Delete unused key and values
      delete activity.values
      delete activity.key;
    })

  // Set up the activity map graphic
  var activityMap = new ActivityMap(summedActivities, {
    "id": "#activity-calendar",
    "parent": "#activity-calendar-container",
    "fit": true,
    "title": "Activity Calendar ",
    "timeColumn": "timestamp",
    "valueColumn": "duration",
    "compact": true
  });

  // Render the activity map
  activityMap.render();
}
