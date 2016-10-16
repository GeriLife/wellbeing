Template.residentsRecentActivityCountsAndMinutesChart.onCreated(function () {
  // Get reference to template instance
  var instance = this;

  // Create reactive variable to hold resident recent activitiy count and minutes
  instance.residentAcitivityCountsAndMinutes = new ReactiveVar();

  Meteor.call("getResidentsRecentActivityMinutesAndCountsByHome", function (error, residentActivityCountsAndMinutes) {
    // Assign chart data to instance reactive variable
    instance.residentAcitivityCountsAndMinutes.set(residentActivityCountsAndMinutes);
  });
});

Template.residentsRecentActivityCountsAndMinutesChart.onRendered(function () {
  // Get reference to template instance
  var instance = this;

  // Set up resident activity counts and minutes chart
  var residentActivityCountsAndMinutesChart = nv.models.scatterChart();

  // Set up chart styles
  residentActivityCountsAndMinutesChart
    .color(d3.scale.category10().range())
    .duration(300)
    .pointSize(30)
    .x(function (d) {
      var activityCount = d.recentActivityCount;

      // Jitter value slightly to prevent overlap
      return activityCount + (Math.random() * 0.5);
    })
    .y(function (d) {
      var activityMinutes = d.recentActivityMinutes;

      // Jitter value slightly to prevent overlap
      return activityMinutes + (Math.random() * 0.5);
    })

  // Format the tooltip
  residentActivityCountsAndMinutesChart.tooltip.contentGenerator(function (obj) {
    // Get resident name for tooltip
    return obj.point.residentName;
  });

  // Get axis label translations
  var xAxisLabel = TAPi18n.__('residentActivityCountsAndMinutesChart-xAxisLabel');
  var yAxisLabel = TAPi18n.__('residentActivityCountsAndMinutesChart-yAxisLabel');

  // Set up the x axis
  residentActivityCountsAndMinutesChart.xAxis
    .tickFormat(d3.format('d'))
    .axisLabel(xAxisLabel);

  // Set up the y axis
  residentActivityCountsAndMinutesChart.yAxis
    .tickFormat(d3.format('d'))
    .axisLabel(yAxisLabel);

  instance.autorun(function () {
    // Get value of resident activity counts and minutes reactive variable
    var residentActivityData = instance.residentAcitivityCountsAndMinutes.get();

    if (residentActivityData) {
      d3.select('#resident-activity-counts-and-minutes-chart svg')
        .datum(residentActivityData)
        .call(residentActivityCountsAndMinutesChart);

      // Update chart dynamically when viewport resizes
      nv.utils.windowResize(residentActivityCountsAndMinutesChart.update);
    }
  });
});
