Template.homeResidentActivitySumsByType.onCreated(function () {
  // Get reference to template instance
  var templateInstance = this;

  // Get current home ID
  templateInstance.homeId = Router.current().params.homeId;

  // set up home resident activity sums by type reactive variable
 templateInstance.homeResidentsActivitySumsByType = new ReactiveVar();

 query = {
   homeId: templateInstance.homeId,
   activityMetric: templateInstance.activityMetric,
   activityPeriod: templateInstance.activityPeriod,
 };

  // Get home resident activity sums from server method
  Meteor.call(
    'getHomeResidentsActivitySumsByType',
    query,
    function (error, activitySums) {
      //Set the home resident activity sums variable with the returned activity sums
      templateInstance.homeResidentsActivitySumsByType.set(activitySums);
  });
});

Template.homeResidentActivitySumsByType.onRendered(function () {
  // Get reference to template instance
  var templateInstance = this;

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
    // TODO: add localization
    .yAxis.axisLabel("Activity count")
    .tickFormat(d3.format('d'));

  templateInstance.autorun(function () {
    // Get the chart data
    var homeResidentsActivitySumsByType = templateInstance.homeResidentsActivitySumsByType.get();

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
});
