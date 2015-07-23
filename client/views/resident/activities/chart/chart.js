Template.residentActivityChart.rendered = function () {
  // Get resident id
  var residentId = this.data._id;

  // Get resident name
  var residentName = this.data.firstName + " " + this.data.lastInitial;

  // Get the resident activities
  var activities = Residents.findOne(residentId).activities().fetch();

  //TODO: Make sure there can be multiple activities in a single day.

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
    .entries(activities);

    summedActivities.map(function (activity) {
      // Create date and duration attributes with proper data types
      activity.date = new Date(activity.key);
      activity.duration = parseInt(activity.values.duration);

      // Delete unused key and values
      delete activity.values
      delete activity.key;
    })

  // Render the chart using MetricsGraphics charting library
  MG.data_graphic({
    title: "Daily activity in minutes.",
    description: "Showing daily activity minutes for " + residentName,
    y_label: 'Minutes',
    y_rug: true,
    data: summedActivities,
    interpolate: 'basic',
    missing_is_zero: true,
    area: false,
    full_width: true,
    height: 200,
    right: 40,
    target: document.getElementById('activity-chart'),
    x_accessor: 'date',
    y_accessor: 'duration'
  });
}
