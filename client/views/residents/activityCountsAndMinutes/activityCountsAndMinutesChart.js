Template.residentsRecentActivityCountsAndMinutesChart.onCreated(function () {
  // Get reference to template instance
  var instance = this;

  // Create reactive variable to hold resident recent activitiy count and minutes
  instance.residentAcitivityCountsAndMinutes = new ReactiveVar();

  Meteor.call("getResidentsRecentActivityMinutesAndCountsByHome", function (error, residentActivityCountsAndMinutes) {
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
    .pointSize(10)
    .x(function (d) { return d.recentActivityCount })
    .y(function (d) { return d.recentActivityMinutes });

  // Format the tooltip
  residentActivityCountsAndMinutesChart.tooltip
    .headerEnabled(false);


  // Set up the x axis
  residentActivityCountsAndMinutesChart.xAxis
    .tickFormat(d3.format('d'))
    .axisLabel('Activity count');

  // Set up the y axis
  residentActivityCountsAndMinutesChart.yAxis
    .tickFormat(d3.format('d'))
    .axisLabel('Activity minutes');

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
