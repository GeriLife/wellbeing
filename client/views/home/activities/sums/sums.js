Template.homeResidentActivitySumsByType.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get current home ID
  instance.homeId = Router.current().params.homeId;

  // set up home resident activity sums by type reactive variable
 instance.homeResidentsActivitySumsByType = new ReactiveVar();

  // Get home resident activity sums from server method
  Meteor.call('getHomeResidentsActivitySumsByType', instance.homeId, function (error, activitySums) {
    //Set the home resident activity sums variable with the returned activity sums
    instance.homeResidentsActivitySumsByType.set(activitySums);
  });

  instance.autorun(function () {
    var homeResidentsActivitySumsByType = instance.homeResidentsActivitySumsByType.get();

   if (instance.view.isRendered && homeResidentsActivitySumsByType) {
      // Draw the chart
      var activityChart = new dimple.chart(instance.chartSvg, homeResidentsActivitySumsByType);
      activityChart.setBounds("5%", "10%", "57%", "80%")
      var residentAxis = activityChart.addCategoryAxis("x", "residentName");
     residentAxis.title = "Resident Name / Activity Count";
      var activitiesAxis = activityChart.addMeasureAxis("y", "sum");
     activitiesAxis.title = "Number of Activities";
      activityChart.addSeries("activityTypeName", dimple.plot.bar);
      activityChart.addLegend("62%", "1%", "38%", "80%", "right");
      activityChart.draw();
    };
  });
};

Template.homeResidentActivitySumsByType.rendered = function () {
  // Get reference to template instance
  var instance = this;

  // Get reference to chart div
 instance.chartSvg = dimple.newSvg("#residentActivitiesSummary", "100%", 400);
};
