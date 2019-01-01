import _ from "lodash";

Template.report.onCreated(function () {
  const templateInstance = this;

  templateInstance.activityData = new ReactiveVar();
  templateInstance.activityMetric = new ReactiveVar();
  templateInstance.timePeriod = new ReactiveVar();
  templateInstance.barMode = new ReactiveVar();
});

Template.report.onRendered(function () {
  const templateInstance = this;

  // Set initial activity metric from template
  const activityMetric = $('input[name="activityMetric"]:checked').val();
  templateInstance.activityMetric.set(activityMetric);

  // Set initial time period from template
  const timePeriod = $('input[name="timePeriod"]:checked').val();
  templateInstance.timePeriod.set(timePeriod);

  // fetch chart data in reactive context
  templateInstance.autorun(function () {
    const timePeriod = templateInstance.timePeriod.get();

    // call method to retrieve aggregated activity data
    Meteor.call('getAggregatedActivities', timePeriod, function (error, activityData) {
      // set activity data in the reactive variable
      templateInstance.activityData.set(activityData);
    });
  });

  // Render chart in reactive context
  templateInstance.autorun(function () {
    const activityData = templateInstance.activityData.get();
    const activityMetric = templateInstance.activityMetric.get();
    const barmode = templateInstance.barMode.get();

    // Make sure we have some activity data
    if (activityData) {
      // Chart data consists of multiple traces
      const data = _.map(activityData, function (activityCategoryData) {
        // Create a trace for each activity type
        return  {
          type: 'bar',
          name: activityCategoryData.key,
          // X values are activity dates
          x: _.map(activityCategoryData.values, function(activityCategoryDay) {
            return new Date(activityCategoryDay.key);
          }),
          // Y values are (currently) activity minutes
          // TODO: add page element to toggle between activity counts and minutes
          y: _.map(activityCategoryData.values, function(activityCategoryDay) {
            return activityCategoryDay.value[activityMetric];
          }),
        };
      });

      // Add plot layout configuration
      const layout = {
        title: TAPi18n.__('reportPageActivitiesChart-title'),
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
      Plotly.newPlot('residentsActivitiesChart', data, layout, { locale });
    }
  })
});

Template.report.events({
  'change #activityMetric' (event, templateInstance) {
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
