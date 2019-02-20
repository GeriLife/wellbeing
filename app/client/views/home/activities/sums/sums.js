Template.homeResidentActivitySumsByType.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  let currentActivityPeriod;
  // Get current home ID
  const homeId = Router.current().params.homeId;

  // set up home resident activity sums by type reactive variable
 templateInstance.homeResidentsActivitySumsByType = new ReactiveVar();

  this.autorun(() => {
    const activityPeriod = Template.currentData().activityPeriod;

    // Not fetch data if period isn't changed
    if (currentActivityPeriod !== activityPeriod) {
      // Get home resident activity sums from server method
      Meteor.call('getHomeResidentsActivitySumsByType', { homeId, period: activityPeriod }, function (error, activitySums) {
        // Set the home resident activity sums variable with the returned activity sums
        templateInstance.homeResidentsActivitySumsByType.set(activitySums);
        // Re-save current period
        currentActivityPeriod = activityPeriod;
      });
    }
  })
});

Template.homeResidentActivitySumsByType.onRendered(function () {
  // Get reference to template instance
  const templateInstance = this;

  templateInstance.autorun(function () {
    // Get the chart data
    const homeResidentsActivitySumsByType = templateInstance.homeResidentsActivitySumsByType.get();
    const activityMetric = Template.currentData().activityMetric;

     if (homeResidentsActivitySumsByType) {
      // Render chart then data is ready
      const data = _.map(homeResidentsActivitySumsByType, dataset => {
        return {
          type: 'bar',
          orientation: 'h',
          // Activity type
          name: dataset.key,
          // Activity count
          x: _.map(dataset.values, item => item[activityMetric]),
          // Resident name
          y: _.map(dataset.values, item => item.label),
        }
      });

      // Add plot layout configuration
      const layout = {
        autosize: true,
        xaxis: {
          title: TAPi18n.__(`homeResidentsActivitySumsByType-chart-xaxisTitle-${ activityMetric }`),
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
      Plotly.newPlot('residentActivitiesSummary', data, layout, { displayModeBar: false, responsive: true });
    }
  });
});
