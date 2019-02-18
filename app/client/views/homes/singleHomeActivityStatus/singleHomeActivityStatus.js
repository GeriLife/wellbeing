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
      if (activityLevelCounts && templateInstance.homeCurrentResidentsCount !== undefined) {
        /*
        Re-structure activity level counts data to an object containing:
        type: the type of activity level (inactive, semiActive, active)
        count: the number of residents with a given activity level
        homePercentage: percentage of home residents with the activity level
        */
        const activityLevelTypes = _.keys(activityLevelCounts);

        const activityLevelData = _.map(activityLevelTypes, function (type) {
          // Default value is 0
          let homePercentage = 0;

          // Avoid dividing by 0
          if (templateInstance.homeCurrentResidentsCount !== 0) {
            // Calculate the percentage of home residents in activity level class
            homePercentage = Math.round(activityLevelCounts[type] / templateInstance.homeCurrentResidentsCount * 100);
          }

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
  const colors = ['#d9534f', '#e6c829', '#5cb85c'];
  // Get reference to template instance
  const templateInstance = this;

  // Get home ID
  const homeId = templateInstance.homeId;

  templateInstance.autorun(function () {
    // Get activity level counts
    const activityLevelCounts = templateInstance.activityLevelCounts.get();

    if (activityLevelCounts) {
      // Render chart then data is ready
      const data = _.map(activityLevelCounts, (dataset, index) => {
        return {
          type: 'bar',
          orientation: 'h',
          // Activity type
          name: dataset.type,
          // Activity count
          x: [dataset.homePercentage],
          marker: { color: colors[index]},
          width: [0.8],
          hoverinfo: 'x+'
        }
      });

      // Add plot layout configuration
      const layout = {
        autosize: true,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        height: 50,
        xaxis: {
          showline: true,
          automargin: true,
          showticklabels: true,
          tickfont: {
            size: 10,
          },
          ticklen: 4,
          ticksuffix: '%',
          range: [0, 100]
        },
        yaxis: {
          showline: false,
          automargin: true,
          showticklabels: false,
        },
        margin: {
          r: 15,
          t: 10,
          b: 5,
          l: 10
        },
        barmode: 'stack',
        showlegend: false,
      };

      // Render plot
      Plotly.newPlot(`activityLevelCountsChart-${homeId}`, data, layout, { displayModeBar: false, responsive: true });
    }
  });
});
