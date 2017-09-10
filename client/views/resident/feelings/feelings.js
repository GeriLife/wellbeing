Template.residentFeelings.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get resident ID from template instance
  const residentId = templateInstance.data.residentId;

  /*
  Template autorun
  */

  // Subscribe to count of resident feelings
  // Used to trigger call to 'get resident feelings percentages' method
  // TODO: figure out a 'cleaner' way to signal that feelings data have changed
  // https://forums.meteor.com/t/send-reactive-signal-from-server-to-client/39141
  templateInstance.subscribe('residentFeelingsCount', residentId);

  // Set up reactive variable to hold resident feelings percentages
  templateInstance.residentFeelingsPercentages = new ReactiveVar();

  // Reactively fetch resident feelings percentages from server
  // by using 'resident ID feelings count' to trigger a call to 'get resident feelings percentages' method
  // TODO: figure out a 'cleaner' way to signal that feelings data have changed
  // https://forums.meteor.com/t/send-reactive-signal-from-server-to-client/39141
  templateInstance.autorun(() => {
    // Get resident feelings count
    // This is just a reactive trigger to fetch resident feelings percentages
    const feelingsCount = Counts.get(`resident_${ residentId }_feelings_count`);

    // Get resident feelings percentages when feelings count changes
    Meteor.call('getFeelingsPercentagesByResidentId', residentId, function (error, residentFeelingsPercentages) {
      // Update resident feelings counts with returned value from method call
      templateInstance.residentFeelingsPercentages.set(residentFeelingsPercentages);
    });
  });

  /*
  Template helper methods
  */

  // Method to clear and render chart
  templateInstance.clearAndRenderChart = function (chartData) {
    // Clear any previous chart
    this.$('#residentFeelingsChart').empty();

    // Render chart with current feeling percentages
    MG.data_graphic({
      title: TAPi18n.__('residentFeelings-chart-title'),
      data: chartData,
      chart_type: 'bar',
      x_accessor: 'value',
      format: 'percentage',
      xax_format: d3.format('.0%'),
      y_accessor: 'localizedFeeling',
      height:300,
      full_width: true,
      target: '#residentFeelingsChart',
    });
  };

  // Method to localize chart data labels
  templateInstance.localizeChartData = function (chartData) {
    // Create localized data for chart
    const localizedChartData = _.map(chartData, function (datum) {
      // Get feeling
      const feeling = datum.key;

      // Get localization string for feeling
      const feelingL10n = TAPi18n.__(`residentFeelings-chart-feelingName-${ feeling }`);

      // Update feeling with localized name
      datum.localizedFeeling = feelingL10n;

      return datum;
    });

    return localizedChartData
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
    const residentFeelingsPercentages = templateInstance.residentFeelingsPercentages.get();

    // Make sure resident feelings percentages data is available
    // and not an empty array
    if (residentFeelingsPercentages && residentFeelingsPercentages.length > 0) {
      // Sort feelings percentages
      const sortedResidentFeelingsPercentages = residentFeelingsPercentages.sort(function (a, b) {
        // Sort from high to low
        return b.value - a.value;
      });

      // Create localized data for chart
      const localizedChartData = templateInstance.localizeChartData(sortedResidentFeelingsPercentages);

      // Render chart with localized data
      templateInstance.clearAndRenderChart(localizedChartData);
    }
  });
});

Template.residentFeelings.helpers({
  residentFeelingsCount () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Return value of resident feelings percentages reactive variable
    return templateInstance.residentFeelingsPercentages.get();
  }
});
