import _ from 'lodash';

Template.homeReport.onCreated(function () {
  // get a reference to template instance
  const templateInstance = this;

  // Get Home ID from template instance
  templateInstance.homeId = Router.current().params.homeId;

  // Get home data for page elements
  templateInstance.subscribe('singleHome', templateInstance.homeId);

  // set reactive variable to hold chart data (attached to template instance)
  templateInstance.activityData = new ReactiveVar();

  // call method to retrieve aggregated activity data
  Meteor.call('getMonthlyAggregatedHomeResidentActivities', templateInstance.homeId, function (error, activities) {
    // set activity data in the reactive variable
    templateInstance.activityData.set(activities);
  })
});

Template.homeReport.onRendered(function () {
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
        }

        return trace;
      })

      // Add plot layout configuration
      const layout = {
        title: TAPi18n.__('homeResidentsActivitiesChart-title'),
        yaxis: {
          title: TAPi18n.__('homeResidentsActivitiesChart-yaxis-title'),
        }
      }

      // Get client locale
      const locale = TAPi18n.getLanguage();

      // Render plot
      Plotly.newPlot('homeResidentsActivitiesChart', data, layout, { locale });
    }
  })
});

Template.homeReport.helpers({
  'home': function () {
    // Create reference to template instance
    const templateInstance = Template.instance();

    const homeId = templateInstance.homeId;

    // Return current Home
    return Homes.findOne(homeId);
  },
});
