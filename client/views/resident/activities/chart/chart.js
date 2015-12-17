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
    chart_type: 'point',
    least_squares: true,
    full_width: true,
    height: 200,
    right: 40,
    target: document.getElementById('activity-chart'),
    x_accessor: 'date',
    y_accessor: 'duration',
    mouseover: function (d, i) {
      var date = d.point.date;
      var formattedDate = moment(date).format("D.M.YYYY");
      var minutes = d.point.duration;
      d3.select('#activity-chart svg .mg-active-datapoint')
        .text(formattedDate + ' ' + minutes + ' minutes');
    }
  });
}
