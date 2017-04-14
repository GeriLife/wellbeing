Template.homeActivityCountsByFacilitatorRole.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get home ID from template instance
  const homeId = templateInstance.data.homeId;

  // Set up reactive variable for chart data
  templateInstance.chartData = new ReactiveVar();

  // Call method to fetch data, assigning it to reactive variable
  Meteor.call('getHomeActivitiesFacilitatorRolesCountsLast30days', homeId, function (error, chartData) {
    console.log('chartData', chartData);
    // update chart data reactive variable
    templateInstance.chartData.set(chartData);
  });
});

Template.homeActivityCountsByFacilitatorRole.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Autorun to render chart when reactive data available
  templateInstance.autorun(function () {
    const chartData = templateInstance.chartData.get();

    if (chartData) {
      // Get reference to chart container
      const svg = dimple.newSvg("#homeActivityCountsByfacilitatorRoleChart", "100%", "100%");

      // Initialize the activity type chart
      const facilitatorRolesChart = new dimple.chart(svg, chartData);

      // Set chart boundaries based on parent container size
      facilitatorRolesChart.setBounds("20%", "5%", "75%", "60%");

      // Change bar color to grey, to avoid confusion with activity type colors
      facilitatorRolesChart.defaultColors = [new dimple.color("#8e8e8e")];

      // Add facilitator roles to x axis
      const xAxis = facilitatorRolesChart.addMeasureAxis("x", "value");

      // Set x axis title
      const xAxisTitle = TAPi18n.__("homeActivityCountsByfacilitatorRoleChart-xAxis-title");
      xAxis.title = xAxisTitle;

      // Disable grid lines
      xAxis.showGridlines = false;

      // Add facilitator role counts to y axis
      const yAxis = facilitatorRolesChart.addCategoryAxis("y", "key");

      // Set y axis title
      const yAxisTitle = TAPi18n.__("homeActivityCountsByfacilitatorRoleChart-yAxis-title");
      yAxis.title = yAxisTitle;

      // Disable grid lines
      yAxis.showGridlines = false;

      // Add bar plot
      facilitatorRolesChart.addSeries(null, dimple.plot.bar);

      // Render chart
      facilitatorRolesChart.draw();
    }
  })
});
