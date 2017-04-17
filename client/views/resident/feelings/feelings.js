Template.residentFeelings.onRendered(function () {
  // Subscribe to resident feelings for current residentID
  this.subscribe('residentFeelings', this.data.residentId);
});

Template.residentFeelings.onRendered(function () {
  // Get resident ID
  const residentId = this.data.residentId;

  this.autorun(() => {
    // Make sure subscription data is ready
    if (this.subscriptionsReady()) {
      // Get all feelings
      const residentFeelings = Feelings.find({ residentId }).fetch();

      // Group feelings by type and calculate percentage for each feeling
      const residentFeelingsCounts = d3.nest()
        // TODO: add localization to the feeling names (possibly below)
        .key(function (datum) { return datum.feeling })
        // TODO: Determine whether to display counts or percentages
        .rollup(function (values) { return values.length / residentFeelings.length })
        .entries(residentFeelings);

      // Make sure feeling counts are available
      if (residentFeelingsCounts) {
        // clear any previous chart
        this.$('#residentFeelingsChart').empty();

        // Render chart with current feeling counts
        MG.data_graphic({
          title: 'Feelings',
          data: residentFeelingsCounts,
          chart_type: 'bar',
          x_accessor: 'values',
          // TODO: Determine whether to display counts or percentages
          format: 'percentage',
          xax_format: d3.format('.0%'),
          y_accessor: 'key',
          height:300,
          full_width: true,
          target: '#residentFeelingsChart',
        });
      }
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
