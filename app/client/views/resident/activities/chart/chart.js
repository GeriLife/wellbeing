import _ from "lodash";

Template.residentActivityTrendChart.onCreated(function () {
  const templateInstance = this;

  // reactive variables to update chart
  templateInstance.activityData = new ReactiveVar();
  templateInstance.activityMetric = new ReactiveVar();
  templateInstance.timePeriod = new ReactiveVar();
  templateInstance.barMode = new ReactiveVar();
});

Template.residentActivityTrendChart.onRendered(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Set initial activity metric from template
  const activityMetric = $('input[name="activityMetric"]:checked').val();
  templateInstance.activityMetric.set(activityMetric);

  // Set initial time period from template
  const timePeriod = $('input[name="timePeriod"]:checked').val();
  templateInstance.timePeriod.set(timePeriod);

  // Set initial bar mode from template
  const barMode = $('input[name="barMode"]:checked').val();
  templateInstance.barMode.set(barMode);

  // automatically fetch aggregated data
  templateInstance.autorun(function () {
    // Get the data aggregation setting(s) from template instance
    const timePeriod = templateInstance.timePeriod.get();

    const residentId = Template.currentData().resident._id;

    // call method to retrieve aggregated activity data
    Meteor.call('getResidentAggregatedActivities', residentId, timePeriod, function (error, activityData) {
      // set activity data in the reactive variable
      templateInstance.activityData.set(activityData);
    });
  });

  // render chart when (new) data are available
  templateInstance.autorun(function () {
    const activityData = templateInstance.activityData.get();
    const activityMetric = templateInstance.activityMetric.get();
    const barmode = templateInstance.barMode.get();

    if (activityData) {
      // Get translation strings
      const activityTrendTitle = TAPi18n.__("residentActivityTrendChart-title");

      // Chart data consists of multiple traces
      const data = _.map(activityData, function (activityCategoryData) {
        // Create a trace for each activity type
        return {
          type: 'bar',
          name: activityCategoryData.key,
          // X values are activity dates
          x: _.map(activityCategoryData.values, function (activityCategoryDay) {
            return new Date(activityCategoryDay.key);
          }),
          y: _.map(activityCategoryData.values, function (activityCategoryDay) {
            return activityCategoryDay.value[activityMetric];
          }),
        };
      });

      // Add plot layout configuration
      const layout = {
        title: activityTrendTitle,
        xaxis: {
          title: TAPi18n.__('reportPageActivitiesChart-xaxis-title'),
        },
        yaxis: {
          title: TAPi18n.__(`reportPageActivitiesChart-yaxis-${activityMetric}`),
        },
        barmode,
      };

      // Get client locale
      const locale = TAPi18n.getLanguage();

      // Render plot
      Plotly.newPlot('activityChart', data, layout, {locale});
    }
  })
});

Template.residentActivityTrendChart.events({
  'change #activityMetric'(event, templateInstance) {
    const activityMetric = $('input[name="activityMetric"]:checked').val();

    templateInstance.activityMetric.set(activityMetric);
  },
  'change #barMode'(event, templateInstance) {
    const barMode = $('input[name="barMode"]:checked').val();

    templateInstance.barMode.set(barMode);
  },
  'change #timePeriod'(event, templateInstance) {
    const timePeriod = $('input[name="timePeriod"]:checked').val();

    templateInstance.timePeriod.set(timePeriod);
  },
});
