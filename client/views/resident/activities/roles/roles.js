Template.residentFacilitatorRolesChart.onRendered(function () {
  // Get reference to template instance
  var instance = Template.instance();

  instance.autorun(function () {
    // Empty the facilitator roles chart, in case of data change
    $("#facilitatorRolesChart").empty();

    // Get activities from template data
    let activities = Template.currentData().activities;

    // Add 'facilitatorRoleName' field to each activity,
    // Containing Role name
    activities = _.map(activities, function (activity) {
      // Get activity type name via collection helper
      activity.facilitatorRoleName = activity.facilitatorRole();

      return activity;
    });

    // Group activities by facilitator role
    const facilitatorRoleCounts = d3.nest()
      .key(function (activity) {
        return activity.facilitatorRoleName;
      })
      .rollup(function (facilitatorRole) { return facilitatorRole.length })
      .entries(activities);

      // Get reference to chart container
      const svg = dimple.newSvg("#facilitatorRolesChart", "100%", "100%");

      // Initialize the activity type chart
      const facilitatorRolesChart = new dimple.chart(svg, facilitatorRoleCounts);

      // Set chart boundaries based on parent container size
      facilitatorRolesChart.setBounds("20%", "5%", "75%", "60%");

      // Add facilitator roles to x axis
      const xAxis = facilitatorRolesChart.addMeasureAxis("x", "values");

      // Set x axis title
      const xAxisTitle = TAPi18n.__("residentFacilitatorRolesChart-xAxis-title");
      xAxis.title = xAxisTitle;

      // Disable grid lines
      xAxis.showGridlines = false;

      // Add facilitator role counts to y axis
      const yAxis = facilitatorRolesChart.addCategoryAxis("y", "key");

      // Set y axis title
      const yAxisTitle = TAPi18n.__("residentFacilitatorRolesChart-yAxis-title");
      yAxis.title = yAxisTitle;

      // Disable grid lines
      yAxis.showGridlines = false;

      // Add bar plot
      facilitatorRolesChart.addSeries(null, dimple.plot.bar);

      // Render chart
      facilitatorRolesChart.draw();
  });
});
