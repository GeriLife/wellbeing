Template.homeActivityCountsByActivityType.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get home ID from template instance
  const homeId = templateInstance.data.homeId;

  // Set up reactive variable for chart data
  templateInstance.chartData = new ReactiveVar();

  // Call method to fetch data, assigning it to reactive variable
  Meteor.call('getHomeActivityTypeCountsLast30days', homeId, function (error, chartData) {
    // update chart data reactive variable
    templateInstance.chartData.set(chartData);
  });
});

Template.homeActivityCountsByActivityType.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Autorun to render chart when reactive data available
  templateInstance.autorun(function () {
    const chartData = templateInstance.chartData.get();

    if (chartData) {
      // Get reference to chart container
      const svg = dimple.newSvg("#homeActivityCountsByActivityTypeChart", "100%", "100%");

      // Initialize the activity type chart
      const activityTypesChart = new dimple.chart(svg, chartData);

      // Set chart boundaries based on parent container size
      activityTypesChart.setBounds("35%", "5%", "65%", "60%");

      // Change bar color to grey, to avoid confusion with activity type colors
      activityTypesChart.defaultColors = [new dimple.color("#8e8e8e")];

      // Add activity types to x axis
      const xAxis = activityTypesChart.addMeasureAxis("x", "value");

      // Set x axis title
      const xAxisTitle = TAPi18n.__("homeActivityCountsByActivityTypeChart-xAxis-title");
      xAxis.title = xAxisTitle;

      // Disable grid lines
      xAxis.showGridlines = false;

      // Add facilitator role counts to y axis
      const yAxis = activityTypesChart.addCategoryAxis("y", "key");

      // Set y axis title
      const yAxisTitle = TAPi18n.__("homeActivityCountsByActivityTypeChart-yAxis-title");
      yAxis.title = yAxisTitle;

      // Disable grid lines
      yAxis.showGridlines = false;

      // Add bar plot
      activityTypesChart.addSeries(null, dimple.plot.bar);

      // Render chart
      activityTypesChart.draw();
    }
  })
});
