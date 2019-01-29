Template.homeResidentActivitySumsByType.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get current home ID
  templateInstance.homeId = Router.current().params.homeId;

  // set up home resident activity sums by type reactive variable
 templateInstance.homeResidentsActivitySumsByType = new ReactiveVar();

  // Get home resident activity sums from server method
  Meteor.call('getHomeResidentsActivitySumsByTypeLast30Days', templateInstance.homeId, function (error, activitySums) {
    //Set the home resident activity sums variable with the returned activity sums
    templateInstance.homeResidentsActivitySumsByType.set(activitySums);
  });
});

Template.homeResidentActivitySumsByType.onRendered(function () {
  // Get reference to template instance
  const templateInstance = this;

  templateInstance.autorun(function () {
    // Get the chart data
    const homeResidentsActivitySumsByType = templateInstance.homeResidentsActivitySumsByType.get();

     if (homeResidentsActivitySumsByType) {
      // Chart data
      const data = _.map(homeResidentsActivitySumsByType, dataset => {
        return {
          type: 'bar',
          orientation: 'h',
          // Activity type
          name: dataset.key,
          // Activity count
          x: _.map(dataset.values, item => item.value),
          // Resident name
          y: _.map(dataset.values, item => item.label),
        }
      })

      // Add plot layout configuration
      const layout = {
        autosize: true,
        height: 300,
        xaxis: {
          showline: true,
          automargin: true,
          showticklabels: true,
          tickfont: {
            size: 10,
          },
          tickwidth: 1,
          ticklen: 4
        },
        yaxis: {
          showline: true,
          automargin: true,
          showticklabels: true,
          tickfont: {
            size: 10,
          },
          tickwidth: 1,
          ticklen: 4
        },
        margin: {
          r: 10,
          t: 10,
          b: 40,
          l: 10
        },
        bargap: 0.05,
        barmode: 'stack',
        showlegend: true,
        legend: {
          traceorder: 'normal',
          x: 0,
          y: 5,
          orientation: 'h'
        }
      };

      // Render plot
      Plotly.newPlot('residentActivitiesSummary', data, layout, {displayModeBar: false}); 
      };
  });
})
