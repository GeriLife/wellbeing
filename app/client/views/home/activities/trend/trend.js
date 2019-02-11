Template.homeResidentActivityLevelTrend.onCreated(function () {
  const templateInstance = this;

  templateInstance.dailyActivityData = new ReactiveVar();

  // Get reference to Route
  const router = Router.current();

  // Get current Home ID
  const homeId = router.params.homeId;

  Meteor.call("getHomeActivityCountTrend", homeId, function (error, result) {
    templateInstance.dailyActivityData.set(result);
  });
});

Template.homeResidentActivityLevelTrend.onRendered(function () {
  // Get reference to template instance
  const templateInstance = this;

  templateInstance.autorun(function () {
    // Get data for trend line chart
    const dailyActivityData = templateInstance.dailyActivityData.get();

    // Render the chart, if data is available
    if (dailyActivityData) {
      // Chart data consists of multiple traces
      const inactiveTrace = {
        mode: 'lines',
        name: TAPi18n.__("homeResidentActivityLevelTrend-legend-inactive"),
        line: { color: 'red' },
        // X values are activity dates
        x: dailyActivityData.date,
        // Y values are activity counts
        y: dailyActivityData.inactivityCounts
      };

      const semiActiveTrace = {
        mode: 'lines',
        name: TAPi18n.__("homeResidentActivityLevelTrend-legend-semiActive"),
        line: { color: 'gold' },
        // X values are activity dates
        x: dailyActivityData.date,
        // Y values are activity counts
        y: dailyActivityData.semiActivityCounts,
      };

      const activeTrace = {
        mode: 'lines',
        name: TAPi18n.__("homeResidentActivityLevelTrend-legend-active"),
        line: { color: 'green' },
        // X values are activity dates
        x: dailyActivityData.date,
        // Y values are activity counts
        y: dailyActivityData.activityCounts,
      };

      // Add chart layout configuration
      const layout = {
        showlegend: true,
        height: 232,
        legend: {
          x: 0,
          y: 1.3,
          orientation: 'h'
        },
        margin: {
          r: 40,
          t: 40,
          b: 40,
          l: 40
        },
        yaxis: {
          title: TAPi18n.__("homeResidentActivityLevelTrend-yAxis-label"),
        }
      };

      // Get client locale
      const locale = TAPi18n.getLanguage();

      // Render chart
      // coloring activity levels to match the 'traffic lights' theme :-)
      Plotly.newPlot('trend-chart', [inactiveTrace, semiActiveTrace, activeTrace], layout, { locale, displayModeBar: false });
    }
  });
});
