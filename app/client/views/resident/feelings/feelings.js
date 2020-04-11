Template.residentFeelings.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Method to clear and render chart
  templateInstance.clearAndRenderChart = function (chartData) {
    // Clear any previous chart
    this.$('#residentFeelingsChart').empty();

    // Render chart with current feeling percentages
    const data = [
      {
        type: 'bar',
        orientation: 'h',
        marker: { color: '#b6b6fc' },
        x: _.map(chartData, (item) => d3.format('.0%')(item.value)),
        y: _.map(chartData, (item) => item.localizedFeeling),
      },
    ];

    // Add plot layout configuration
    const layout = {
      autosize: true,
      height: 300,
      title: TAPi18n.__('residentFeelings-chart-title'),
      xaxis: {
        showgrid: false,
        showline: true,
        automargin: true,
        showticklabels: true,
        tickfont: {
          size: 10,
        },
        tickwidth: 0.5,
        ticklen: 10,
      },
      yaxis: {
        showgrid: false,
        showline: true,
        automargin: true,
        showticklabels: true,
        tickfont: {
          size: 10,
        },
        tickwidth: 1,
        ticklen: 8,
      },
      margin: {
        autoexpand: true,
        r: 10,
        t: 60,
        b: 20,
        l: 80,
      },
      bargap: 0.3,
      showlegend: false,
    };

    // Get client locale
    const locale = TAPi18n.getLanguage();
    Plotly.newPlot('residentFeelingsChart', data, layout, { locale });
  };

  // Method to localize chart data labels
  templateInstance.localizeChartData = function (chartData) {
    // Create localized data for chart
    const localizedChartData = _.map(chartData, function (datum) {
      // Get feeling
      const feeling = datum.key;

      // Get localization string for feeling
      const feelingL10n = TAPi18n.__(
        `residentFeelings-chart-feelingName-${feeling}`
      );

      // Update feeling with localized name
      datum.localizedFeeling = feelingL10n;

      return datum;
    });

    return localizedChartData;
  };
});

Template.residentFeelings.onRendered(function () {
  // Get reference to template instance
  const templateInstance = this;

  /*
  Template autorun
  */

  templateInstance.autorun(() => {
    // Get resident feelings percentages
    const residentFeelingsPercentages = Template.currentData().residentFeelingsPercentages;

    // Make sure resident feelings percentages data is available
    // and not an empty array
    if (
      residentFeelingsPercentages &&
      residentFeelingsPercentages.length > 0
    ) {
      // Sort feelings percentages
      const sortedResidentFeelingsPercentages = residentFeelingsPercentages.sort(
        function (a, b) {
          // Sort from high to low
          return b.value - a.value;
        }
      );

      // Create localized data for chart
      const localizedChartData = templateInstance.localizeChartData(
        sortedResidentFeelingsPercentages
      );

      // Render chart with localized data
      templateInstance.clearAndRenderChart(localizedChartData);
    }
  });
});

/*
  Template helper methods
  */
Template.residentFeelings.helpers({
  residentFeelingsCount() {
    // Return value of resident feelings percentages reactive variable
    return Template.currentData().residentFeelingsPercentages;
  },
});
