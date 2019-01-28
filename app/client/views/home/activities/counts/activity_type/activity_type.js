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

Template.homeActivityCountsByActivityType.onRendered(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Autorun to render chart when reactive data available
  templateInstance.autorun(function () {
    const chartData = templateInstance.chartData.get();

    if (chartData) {

      // Chart data
      const data = [
        {
          type: 'bar',
          orientation: 'h',
          marker: { color: '#8e8e8e' },
          x: _.map(chartData, item => item.value),
          y: _.map(chartData, item => item.key),
        }
      ];

      // Add plot layout configuration
      const layout = {
        autosize: true,
        height: 250,
        xaxis: {
          title: TAPi18n.__("homeActivityCountsByActivityTypeChart-xAxis-title"),
          showgrid: false,
          showline: true,
          automargin: true,
          showticklabels: true,
          tickfont: {
            size: 10,
          },
          tickwidth: 1,
          ticklen: 8
        },
        yaxis: {
          title: TAPi18n.__("homeActivityCountsByActivityTypeChart-yAxis-title"),
          showgrid: false,
          showline: true,
          automargin: true,
          showticklabels: true,
          tickfont: {
            size: 10,
          },
          tickwidth: 1,
          ticklen: 8
        },
        margin: {
          autoexpand: true,
          r: 10,
          t: 60,
          b: 20,
          l: 80
        },
        bargap: 0.05,
        showlegend: false,
      };

      // Get client locale
      const locale = TAPi18n.getLanguage();

      // Render plot
      Plotly.newPlot('homeActivityCountsByActivityTypeChart', data, layout, {locale});
    }
  })
});
