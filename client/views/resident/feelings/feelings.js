Template.residentFeelings.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Get resident ID from template instance
  const residentId = templateInstance.data.residentId;

  // Set up reactive variable to hold resident feelings counts
  templateInstance.residentFeelingsCounts = new ReactiveVar();

  // Method to clear and render chart
  templateInstance.clearAndRenderChart = function (chartData) {
    // clear any previous chart
    this.$('#residentFeelingsChart').empty();

    // Render chart with current feeling counts
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

  // Fetch resident feelings counts from server
  Meteor.call('getFeelingsCountsByResidentId', residentId, function (error, residentFeelingsCounts) {
    // Update resident feelings counts with returned value from method call
    templateInstance.residentFeelingsCounts.set(residentFeelingsCounts);
  });
});

Template.residentFeelings.onRendered(function () {
  // Get reference to template instance
  const templateInstance = this;

  templateInstance.autorun(() => {
    // Get resident feelings counts
    const residentFeelingsCounts = templateInstance.residentFeelingsCounts.get();

    // Make sure resident feelings counts data is available
    if (residentFeelingsCounts) {
      // Create localized data for chart
      const localizedChartData = templateInstance.localizeChartData(residentFeelingsCounts);

      // Render chart with localized data
      templateInstance.clearAndRenderChart(localizedChartData);
    }
  });
});

Template.residentFeelings.helpers({
  residentFeelingsCount () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get resident ID from template instance
    const residentId = templateInstance.data.residentId;

    // return a count of resident feelings
    return Feelings.find({ residentId }).count();
  }
});
