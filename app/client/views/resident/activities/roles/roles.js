Template.residentFacilitatorRolesChart.onRendered(function() {
  // Get reference to template instance
  var instance = Template.instance();

  instance.autorun(function() {
    // Empty the facilitator roles chart, in case of data change
    $("#facilitatorRolesChart").empty();

    // Get activities from template data
    let activities = Template.currentData().activities;

    // Add 'facilitatorRoleName' field to each activity,
    // Containing Role name
    activities = _.map(activities, function(activity) {
      // Get activity type name via collection helper
      activity.facilitatorRoleName = activity.facilitatorRole();

      return activity;
    });

    // Group activities by facilitator role
    const facilitatorRoleCounts = d3
      .nest()
      .key(function(activity) {
        return activity.facilitatorRoleName;
      })
      .rollup(function(facilitatorRole) {
        return facilitatorRole.length;
      })
      .entries(activities);

    if (facilitatorRoleCounts && facilitatorRoleCounts.length > 0) {
      const data = [
        {
          type: "bar",
          y: _.map(facilitatorRoleCounts, r => r.key.substr(0, 6)),
          x: _.map(facilitatorRoleCounts, r => r.values),
          text: _.map(
            facilitatorRoleCounts,
            r => `key:${r.key} \n value:${r.values}`
          ),
          marker: {
            color: "#9ac0db"
          },
          width: 0.5,
          orientation: "h"
        }
      ];

      // Add plot layout configuration
      const layout = {
        xaxis: {
          title: TAPi18n.__("residentFacilitatorRolesChart-xAxis-title")
        },
        yaxis: {
          title: TAPi18n.__("residentFacilitatorRolesChart-yAxis-title")
        },
        width: 600,
        height: 350
        // bargap: 0.8
      };

      // Get client locale
      const locale = TAPi18n.getLanguage();

      // Render plot
      Plotly.newPlot("facilitatorRolesChart", data, layout, { locale });
    }
  });
});
