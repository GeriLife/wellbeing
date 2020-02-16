Template.residentFacilitatorRolesChart.onRendered(function() {
  // Get reference to template instance
  var instance = Template.instance();

  instance.autorun(function() {
    // Empty the facilitator roles chart, in case of data change
    $('#facilitatorRolesChart').empty();

    Meteor.call(
      'getCountsByType',
      instance.data.residentId,
      'facilitatorRoleName',
      function(error, facilitatorRoleCounts) {
        if (
          facilitatorRoleCounts &&
          facilitatorRoleCounts.length > 0
        ) {
          const data = [
            {
              type: 'bar',
              y: _.map(facilitatorRoleCounts, r =>
                r.key.substr(0, 6)
              ),
              x: _.map(facilitatorRoleCounts, r => r.value),
              text: _.map(facilitatorRoleCounts, r => `${r.key}`),
              marker: {
                color: '#9ac0db',
              },
              orientation: 'h',
            },
          ];

          const layout = {
            xaxis: {
              title: TAPi18n.__(
                'residentFacilitatorRolesChart-xAxis-title'
              ),
            },
            yaxis: {
              title: TAPi18n.__(
                'residentFacilitatorRolesChart-yAxis-title'
              ),
            },
          };

          const locale = TAPi18n.getLanguage();

          Plotly.newPlot('facilitatorRolesChart', data, layout, {
            locale,
            responsive: true,
          });
        }
      }
    );
  });
});
