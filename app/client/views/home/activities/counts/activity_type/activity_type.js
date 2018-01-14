Template.homeActivityCountsByActivityType.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

    // Get home ID from template instance
    templateInstance.homeId = Router.current().params.homeId;

  // Set up reactive variable for chart data
  templateInstance.chartData = new ReactiveVar();

  // Call method to fetch data, assigning it to reactive variable
  Meteor.call('getHomeActivityTypeCounts', templateInstance.homeId,templateInstance.data.date.get(), function (error, chartData) {
    console.log('chartData', chartData);
    // update chart data reactive variable
    templateInstance.chartData.set(chartData);
  });
    templateInstance.autorun(
        function () {
            let date = templateInstance.data.date.get();
            Meteor.call('getHomeActivityTypeCounts', templateInstance.homeId, date, function (error, chartData) {
                //Set the home resident activity sums variable with the returned activity sums
                templateInstance.chartData.set(chartData);
            });

        })

});

Template.homeActivityCountsByActivityType.onRendered(function () {
    // Get reference to template instance
    const templateInstance = this;
    const svg = dimple.newSvg("#homeActivityCountsByActivityTypeChart", "100%", "100%");
    console.log(svg)
    // Initialize the activity type chart
    const activityTypeChart = new dimple.chart(svg);
    activityTypeChart.setBounds("20%", "5%", "75%", "60%");

    // Change bar color to grey, to avoid confusion with activity type colors
    activityTypeChart.defaultColors = [new dimple.color("#8e8e8e")];

    // Add facilitator roles to x axis
    const xAxis = activityTypeChart.addMeasureAxis("x", "value");

    // Set x axis title
    const xAxisTitle = TAPi18n.__("homeActivityCountsByActivityTypeChart-xAxis-title");
    xAxis.title = xAxisTitle;

    // Disable grid lines
    xAxis.showGridlines = false;

    // Add facilitator role counts to y axis
    const yAxis = activityTypeChart.addCategoryAxis("y", "key");

    // Set y axis title
    const yAxisTitle = TAPi18n.__("homeActivityCountsByActivityTypeChart-yAxis-title");
    yAxis.title = yAxisTitle;

    // Disable grid lines
    yAxis.showGridlines = false;

    // Add bar plot
    activityTypeChart.addSeries(null, dimple.plot.bar);
    // Autorun to render chart when reactive data available
    templateInstance.autorun(function () {
        let newData = templateInstance.chartData.get();
        if (newData && newData.length > 0) {
            activityTypeChart.data= newData;
            // Render chart
            activityTypeChart.draw();
        }
        else if(newData !== undefined) {
            //if the return is empty array we just reset the data so the charts are still showing
            const data = activityTypeChart.data;
            data.map(function (x) {
                x.value = 0;
            });
            activityTypeChart.data= data;
            activityTypeChart.draw();
        }

    })

});
