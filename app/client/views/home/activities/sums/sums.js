Template.homeResidentActivitySumsByType.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get current home ID
  instance.homeId = Router.current().params.homeId;

  // set up home resident activity sums by type reactive variable
 instance.homeResidentsActivitySumsByType = new ReactiveVar();

  // Get home resident activity sums from server method
  Meteor.call('getHomeResidentsActivitySumsByTypeLast30Days', instance.homeId, function (error, activitySums) {
    //Set the home resident activity sums variable with the returned activity sums
    instance.homeResidentsActivitySumsByType.set(activitySums);
  });
};

Template.homeResidentActivitySumsByType.rendered = function () {
  // Get reference to template instance
  var instance = this;

  var activityCountChart = nv.models.multiBarHorizontalChart();

  // Get colors from D3, twenty category
  var colors = d3.scale.category20().range();

  // Remove red from the colors list
  var customColors = _.without(colors, "#d62728");

  activityCountChart
    //.height(800)
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
    .duration(250)
    .margin({bottom: 25, left: 70})
    .stacked(true)
    .showControls(false)
    .color(customColors)

  activityCountChart
    .yAxis.axisLabel("Activity count")
    .tickFormat(d3.format('d'));

  instance.autorun(function () {
    // Get the chart data
    var homeResidentsActivitySumsByType = instance.homeResidentsActivitySumsByType.get();

     if (homeResidentsActivitySumsByType !== undefined) {
       // render the chart when data is available
      d3.select('#residentActivitiesSummary svg')
        .datum(homeResidentsActivitySumsByType)
        .call(activityCountChart);

        // Refresh the chart when window resizes, so chart fills space
        // Note, this must be envoked after ".call(chart)"
        nv.utils.windowResize(activityCountChart.update);
      };
  });
};
