Template.singleHomeActivityStatus.onCreated(function () {
    const templateInstance = this;

    // Get ID of current home
    templateInstance.homeId = templateInstance.data.home._id;

    // Add variable to hold activity counts
    templateInstance.activityLevelCounts = new ReactiveVar();

    templateInstance.autorun(function () {
      // Get count of home current residents (not departed or on hiatus)
      templateInstance.homeCurrentResidentsCount = ReactiveMethod.call("getHomeCurrentAndActiveResidentCount", templateInstance.homeId);

      // Retrieve home resident activity level counts from server
      const activityLevelCounts = ReactiveMethod.call("getHomeActivityLevelCounts", templateInstance.homeId);

      // Make sure activity level counts exist
      if (activityLevelCounts && templateInstance.homeCurrentResidentsCount) {
        /*
        Re-structure activity level counts data to an object containing:
        type: the type of activity level (inactive, semiActive, active)
        count: the number of residents with a given activity level
        homePercentage: percentage of home residents with the activity level
        */
        const activityLevelTypes = _.keys(activityLevelCounts);

        const activityLevelData = _.map(activityLevelTypes, function (type) {
          // Calculate the percentage of home residents in activity level class
          const homePercentage = activityLevelCounts[type] / templateInstance.homeCurrentResidentsCount;

          // Construct an object with the type and count keys
          const activityLevelCountObject = {
            // Activity level class (inactive, semi-active, active)
            type: type,
            // Number of residents in activity class
            count: activityLevelCounts[type],
            // Percentage of home residents fallint into activity level class
            homePercentage: homePercentage
          };

          return activityLevelCountObject;
        });

        // Update the reactive variable, to trigger the graph to render
        templateInstance.activityLevelCounts.set(activityLevelData);
      }
    });
  });

Template.singleHomeActivityStatus.onRendered(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get home ID
  const homeId = templateInstance.homeId;

  /*
  Set up chart
  */
  // TODO: Replace this chart with one from Plotly.js
  // Set up ID string for chart element
  const svgId = `#activityLevelCountsChart-${homeId}`;

  // Get reference to chart element
  const svg = dimple.newSvg(svgId, "100%", 50);

  // Initialize chart with empty data array
  const activityLevelsChart = new dimple.chart(svg, []);

  // Set chart boundaries
  activityLevelsChart.setBounds(10, 0, "90%", "65%");

  // Add home resident percentage to x axis
  const xAxis = activityLevelsChart.addMeasureAxis("x", "homePercentage");

  // Format x axis as percentage
  // Note: both chart.addPctAxis and axis.showPercentage caused d3 NaN errors
  xAxis.tickFormat = "%";

  // Set x axis max to 100% for easy cross-comparison
  xAxis.overrideMax = 1;

  // Remove x axis grid lines
  xAxis.showGridlines = false;

  // Add activity level type to y axis
  const yAxis = activityLevelsChart.addCategoryAxis("y", "type");

  // Hide the y axis labels
  yAxis.hidden = true;

  // Sort the y axis activity levels
  yAxis.addOrderRule(["active", "semiActive", "inactive"]);

  // Define bar chart series
  activityLevelsChart.addSeries(null, dimple.plot.bar);

  templateInstance.autorun(function () {
    // Get activity level counts
    const activityLevelCounts = templateInstance.activityLevelCounts.get();

    if (activityLevelCounts) {
      // Add activity level data to chart
      activityLevelsChart.data = activityLevelCounts;

      // Draw the chart
      activityLevelsChart.draw(1000);

      // Remove x axis title
      xAxis.titleShape.remove();
    }
  });
});
