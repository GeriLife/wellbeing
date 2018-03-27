import moment from 'moment';

Template.homeResidentActivityLevelTrend.rendered = function () {
  // Get reference to template instance
  var instance = this;

  instance.autorun(function () {
    // Get reference to Route
    var router = Router.current();

    // Get current Home ID
    var homeId = router.params.homeId;

    // Get data for trend line chart
    var dailyActivityData = ReactiveMethod.call("getHomeActivityCountTrend", homeId);

    // Render the chart, if data is available
    if (dailyActivityData) {
      // Make sure all daily activity data is in user local timezone
      // (fixes chart legend 'misalignment' due to timezone offset)
      var userLocalTimezoneData = _.map(dailyActivityData, function (dailyActivity) {
        // Format daily activity date in YYYY-MM-DD
        // (stripping timezone and time from date object)
        const dateString = moment(dailyActivity.date).format("YYYY-MM-DD");

        // Create new date object, based on cleaned date string
        dailyActivity.date = moment(dateString).toDate();

        return dailyActivity;
      });

      // Get i18n texts for chart
      const activityLevelTrendTitle = TAPi18n.__("homeResidentActivityLevelTrend-chartTitle");
      const activityLevelTrendDescription = TAPi18n.__("homeResidentActivityLevelTrend-chartDescription");
      const yAxisLabel = TAPi18n.__("homeResidentActivityLevelTrend-yAxis-label");
      const legendInactive = TAPi18n.__("homeResidentActivityLevelTrend-legend-inactive");
      const legendSemiActive = TAPi18n.__("homeResidentActivityLevelTrend-legend-semiActive");
      const legendActive = TAPi18n.__("homeResidentActivityLevelTrend-legend-active");

      // Render the timezone adjusted data in a multi-line chart
      // coloring activity levels to match the 'traffic lights' theme :-)
      MG.data_graphic({
          title: activityLevelTrendTitle,
          description: activityLevelTrendDescription,
          data: userLocalTimezoneData,
          x_axis: true,
          y_label: yAxisLabel,
          y_accessor: ['inactive', 'semiActive', 'active'],
          interpolate: 'basic',
          full_width: true,
          height: 333,
          right: 49,
          target: '#trend-chart',
          legend: [legendInactive, legendSemiActive, legendActive],
          colors: ['red', 'gold', 'green'],
          aggregate_rollover: true
      });
    }
  });
}
