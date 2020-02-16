Template.residentActivityTypesChart.onRendered(function() {
  // Get reference to template instance
  var instance = Template.instance();

  instance.autorun(function() {
    // Empty the activity types chart, in case of data change
    $('#activityTypesChart').empty();

    Meteor.call(
      'getCountsByType',
      instance.data.residentId,
      'activityTypeName',
      function(error, activityTypeCounts) {
        if (activityTypeCounts && activityTypeCounts.length > 0) {
          const data = [
            {
              type: 'bar',
              y: _.map(activityTypeCounts, r => r.key.substr(0, 6)),
              x: _.map(activityTypeCounts, r => r.value),
              text: _.map(activityTypeCounts, r => `${r.key}`),
              marker: {
                color: '#9ac0db',
              },
              orientation: 'h',
            },
          ];

          const layout = {
            xaxis: {
              title: TAPi18n.__(
                'residentActivityTypesChart-xAxis-title'
              ),
            },
            yaxis: {
              title: TAPi18n.__(
                'residentActivityTypesChart-yAxis-title'
              ),
            },
          };

          const locale = TAPi18n.getLanguage();

          Plotly.newPlot('activityTypesChart', data, layout, {
            locale,
            responsive: true,
          });
        }
      }
    );
  });
});
