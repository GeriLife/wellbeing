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

  // Set up axis tickmarks
  residentActivityCountsAndMinutesChart
    .xAxis.tickFormat(d3.format('d'))
    .yAxis.tickFormat(d3.format('d'));
});
