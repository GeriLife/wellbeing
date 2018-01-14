Template.homeActivityCountsByFacilitatorRole.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get home ID from template instance
    templateInstance.homeId = Router.current().params.homeId;

  // Set up reactive variable for chart data
  templateInstance.chartData = new ReactiveVar();

  // Call method to fetch data, assigning it to reactive variable
  Meteor.call('getHomeActivitiesFacilitatorRolesCounts', templateInstance.homeId,templateInstance.data.date.get(), function (error, chartData) {
    console.log('chartData', chartData);
    // update chart data reactive variable
    templateInstance.chartData.set(chartData);
  });
  templateInstance.autorun(
      function () {
        let date = templateInstance.data.date.get();
        Meteor.call('getHomeActivitiesFacilitatorRolesCounts', templateInstance.homeId, date, function (error, chartData) {
          //Set the home resident activity sums variable with the returned activity sums
            templateInstance.chartData.set(chartData);
        });

        })
});

Template.homeActivityCountsByFacilitatorRole.onRendered(function () {
    // Get reference to template instance
    const templateInstance = this;
    const svg = dimple.newSvg("#homeActivityCountsByFacilitatorRoleChart", "100%", "100%");
    console.log(svg)
    // Initialize the activity type chart
    const facilitatorRolesChart = new dimple.chart(svg);
    facilitatorRolesChart.setBounds("20%", "5%", "75%", "60%");

    // Change bar color to grey, to avoid confusion with activity type colors
    facilitatorRolesChart.defaultColors = [new dimple.color("#8e8e8e")];

    // Add facilitator roles to x axis
    const xAxis = facilitatorRolesChart.addMeasureAxis("x", "value");

    // Set x axis title
    const xAxisTitle = TAPi18n.__("homeActivityCountsByFacilitatorRoleChart-xAxis-title");
    xAxis.title = xAxisTitle;

    // Disable grid lines
    xAxis.showGridlines = false;

    // Add facilitator role counts to y axis
    const yAxis = facilitatorRolesChart.addCategoryAxis("y", "key");

    // Set y axis title
    const yAxisTitle = TAPi18n.__("homeActivityCountsByFacilitatorRoleChart-yAxis-title");
    yAxis.title = yAxisTitle;

    // Disable grid lines
    yAxis.showGridlines = false;

    // Add bar plot
    facilitatorRolesChart.addSeries(null, dimple.plot.bar);
    // Autorun to render chart when reactive data available
    templateInstance.autorun(function () {
        let newData = templateInstance.chartData.get();
        if (newData && newData.length > 0) {
            facilitatorRolesChart.data= newData;

            // Render chart
            facilitatorRolesChart.draw();
        }
        else if(newData !== undefined) {
            //if the return is empty array we just reset the data so the charts are still showing

            const data = facilitatorRolesChart.data;
            data.map(function (x) {
                x.value = 0;
            });
            facilitatorRolesChart.data= data;
            facilitatorRolesChart.draw();
        }

    })
  // Autorun to render chart when reactive data available

});
