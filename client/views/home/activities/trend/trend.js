Template.homeResidentActivityLevelTrend.created = function () {
  // Get reference to template instance
  var instance = this;




  instance.autorun(function () {

  });
};

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
    console.log(data);
    if (data) {
      MG.data_graphic({
          title: "Resident activity level trends for past seven days",
          description: "Daily count of residents with inactive, semi-active, and active status.",
          data: [data[0], data[1], data[2]],
          x_axis: false,
          interpolate: 'basic',
          full_width: true,
          height: 200,
          right: 40,
          target: '#trend-chart',
          legend: ['Inactive','Semi-active','Active'],
          legend_target: '.legend',
          colors: ['red', 'gold', 'green'],
          aggregate_rollover: true
      });
    }
  });
}
