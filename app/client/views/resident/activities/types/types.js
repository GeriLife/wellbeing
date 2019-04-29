Template.residentActivityTypesChart.onRendered(function() {
  // Get reference to template instance
  var instance = Template.instance();

  instance.autorun(function() {
    // Empty the activity types chart, in case of data change
    $("#activityTypesChart").empty();

    // Get activities from template data
    let activities = Template.currentData().activities;

    // Add 'type' field to each activity,
    // Containing activity type name
    activities = _.map(activities, function(activity) {
      // Get activity type name via collection helper
      activity.type = activity.activityType();

      return activity;
    });

    const activityTypeCounts = d3
      .nest()
      .key(function(activity) {
        return activity.type;
      })
      .rollup(function(activityType) {
        return activityType.length;
      })
      .entries(activities);

    if (activityTypeCounts && activityTypeCounts.length > 0) {
      const data = [
        {
          type: "bar",
          y: _.map(activityTypeCounts, r => r.key.substr(0, 6)),
          x: _.map(activityTypeCounts, r => r.values),
          text: _.map(
            activityTypeCounts,
            r => `key:${r.key} \n value:${r.values}`
          ),
          marker: {
            color: "#9ac0db"
          },
          width: 0.5,
          orientation: "h"
        }
      ];

      const layout = {
        xaxis: {
          title: TAPi18n.__("residentActivityTypesChart-xAxis-title")
        },
        yaxis: {
          title: TAPi18n.__("residentActivityTypesChart-yAxis-title")
        },
        width: 600,
        height: 350
      };

      const locale = TAPi18n.getLanguage();

      Plotly.newPlot("activityTypesChart", data, layout, { locale });
    }
  });
});
