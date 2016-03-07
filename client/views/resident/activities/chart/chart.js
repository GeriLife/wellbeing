Template.residentActivityChart.rendered = function () {
  // Get reference to template instance
  const instance = this;

  // Get resident name
  const residentName = instance.data.firstName + " " + instance.data.lastInitial;

  // Get the resident activities from template instance
  const activities = instance.data.activities;

  // Group activities by activity date
  const nestedActivities = d3.nest()
    .key(function (activity) {
      return activity.activityDate;
    })

  // Get a sum of activities
  const summedActivities = nestedActivities.rollup(function (activity) {
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

  // Get translation strings
  const activityTrendTitle = TAPi18n.__("residentActivityChart-title");
  const activityTrendDescription = TAPi18n.__("residentActivityChart-description");
  const yLabel = TAPi18n.__("residentActivityChart-yLabel");
  const mouseoverLabel = TAPi18n.__("residentActivityChart-mouseoverLabel");

  // Render the chart using MetricsGraphics charting library
  MG.data_graphic({
    title: activityTrendTitle,
    description: activityTrendDescription,
    y_label: yLabel,
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
      const date = d.point.date;
      const formattedDate = moment(date).format("D.M.YYYY");
      const minutes = d.point.duration;
      d3.select('#activity-chart svg .mg-active-datapoint')
        .text(formattedDate + ' ' + minutes + ' ' + mouseoverLabel);
    }
  });
}
