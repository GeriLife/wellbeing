import _ from "lodash";

Template.report.onCreated(function () {
  const templateInstance = this;

  templateInstance.activityData = new ReactiveVar();

  // call method to retrieve aggregated activity data
  Meteor.call('getMonthlyAggregatedActivities', templateInstance.homeId, function (error, activityData) {
    // set activity data in the reactive variable
    templateInstance.activityData.set(activityData);
  })
});

Template.report.onRendered(function () {
  const templateInstance = this;

  templateInstance.autorun(function () {
    //TODO: add reactive data source to toggle between
    //  - 'activity_minutes'
    //  - 'activity_count'
    const activityData = templateInstance.activityData.get();

    // Make sure we have some activity data
    if (activityData) {
      // Chart data consists of multiple traces
      const data = _.map(activityData, function (activityCategoryData) {
        // Create a trace for each activity type
        const trace = {
          type: 'bar',
          name: activityCategoryData.key,
          // X values are activity dates
          x: _.map(activityCategoryData.values, function(activityCategoryDay) {
            return new Date(activityCategoryDay.key);
          }),
          // Y values are (currently) activity minutes
          // TODO: add page element to toggle between activity counts and minutes
          y: _.map(activityCategoryData.values, function(activityCategoryDay) {
            return activityCategoryDay.value.activity_count;
          }),
        };

        return trace;
      });

      // Add plot layout configuration
      const layout = {
        title: TAPi18n.__('reportPageActivitiesChart-title'),
        yaxis: {
          title: TAPi18n.__('reportPageActivitiesChart-yaxis-title'),
        }
      };

      // Get client locale
      const locale = TAPi18n.getLanguage();

      // Render plot
      Plotly.newPlot('residentsActivitiesChart', data, layout, { locale });
    }
  })
});