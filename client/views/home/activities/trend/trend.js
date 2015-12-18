Template.homeResidentActivityLevelTrend.rendered = function () {
  // Get reference to template instance
  var instance = this;

  instance.autorun(function () {
    // Get reference to Route
    var router = Router.current();

    // Get current Home ID
    var homeId = router.params.homeId;

    // Get data for trend line chart
    var data = ReactiveMethod.call("getHomeActivityCountTrend", homeId);

    // Render the chart, if data is available
    if (data) {
      MG.data_graphic({
          title: "Count of residents per activity level for each of last seven days",
          description: "Daily count of residents with inactive, semi-active, and active status.",
          data: data,
          x_axis: true,
          y_label: "Number of residents",
          y_accessor: ['inactive', 'semiActive', 'active'],
          interpolate: 'basic',
          full_width: true,
          height: 333,
          right: 49,
          target: '#trend-chart',
          legend: ['Inactive','Semi-active','Active'],
          colors: ['red', 'gold', 'green'],
          aggregate_rollover: true
      });
    }
  });
}
