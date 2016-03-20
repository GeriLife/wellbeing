Template.singleHomeActivityStatus.onCreated(function () {
    var instance = this;

    // Get ID of current home
    instance.homeId = instance.data.home._id;

    // Add variable to hold activity counts
    instance.activityLevelCounts = new ReactiveVar();

    instance.autorun(function () {
      // Get count of home current residents
      instance.homeCurrentResidentsCount = ReactiveMethod.call("getHomeCurrentResidentCount", instance.homeId);

      // Retrieve home resident activity level counts from server
      const activityLevelCounts = ReactiveMethod.call("getHomeActivityLevelCounts", instance.homeId);

      // Make sure activity level counts exist
      if (activityLevelCounts && instance.homeCurrentResidentsCount) {
        /*
        Re-structure activity level counts data to an object containing:
        type: the type of activity level (inactive, semiActive, active)
        count: the number of residents with a given activity level
        homePercentage: percengage of home residents with the activity level
        */
        const activityLevelTypes = _.keys(activityLevelCounts);

        const activityLevelData = _.map(activityLevelTypes, function (type) {
          // Calculate the percentage of home residents in activity level class
          const homePercentage = activityLevelCounts[type] / instance.homeCurrentResidentsCount;

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
        instance.activityLevelCounts.set(activityLevelData);
      }
    });
  });

Template.singleHomeActivityStatus.onRendered(function () {
  // Get reference to template instance
  const instance = this;

  // Get home ID
  const homeId = instance.homeId;

  /*
  Set up chart
  */

  // Set up ID string for chart element
  const svgId = `#activityLevelCountsChart-${homeId}`;

  // Get reference to chart element
  const svg = dimple.newSvg(svgId, "100%", 100);

  // Initialize chart with empty data array
  const activityLevelsChart = new dimple.chart(svg, []);

  // Set chart boundaries
  activityLevelsChart.setBounds("15%", "5%", "80%", "70%");

  // Add home resident percentage to x axis
  const xAxis = activityLevelsChart.addMeasureAxis("x", "homePercentage");

  // Format x axis as percentage
  // Note: both chart.addPctAxis and axis.showPercentage caused d3 NaN errors
  xAxis.tickFormat = "%";

  // Set x axis max to 100% for easy cross-comparison
  xAxis.overrideMax = 1;

  // Add activity level type to y axis
  const yAxis = activityLevelsChart.addCategoryAxis("y", "type");

  // Sort the y axis by activity level type
  yAxis.addOrderRule(["active", "semiActive", "inactive"]);

  // Define bar chart series
  activityLevelsChart.addSeries(null, dimple.plot.bar);

  instance.autorun(function () {
    // Get activity level counts
    const activityLevelCounts = instance.activityLevelCounts.get();

    if (activityLevelCounts) {
      // Add activity level data to chart
      activityLevelsChart.data = activityLevelCounts;

      // Draw the chart
      activityLevelsChart.draw();
    }
  });
});
