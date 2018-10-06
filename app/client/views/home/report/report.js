import _ from 'lodash';
import Plotly from 'plotly.js-dist';

Template.homeReport.onCreated(function () {
  // get a reference to template instance
  const templateInstance = this;

  // Get Home ID from template instance
  templateInstance.homeId = Router.current().params.homeId;

  templateInstance.subscribe('singleHome', templateInstance.homeId);

  // TODO: add localization
  //Plotly.setLocale('fi')

  // set reactive variable to hold chart data (attached to template instance)
  templateInstance.activityData = new ReactiveVar();

  // call method to retrieve aggregated activity data
  Meteor.call('getDailyAggregatedHomeResidentActivities', templateInstance.homeId, function (error, activities) {
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
      const data = _.map(activityData, function (activityCategoryData) {
        const trace = {
          type: 'scatter',
          mode: 'lines',
          name: activityCategoryData.key,
          x: _.map(activityCategoryData.values, function(activityCategoryDay) {
            return new Date(activityCategoryDay.key);
          }),
          y: _.map(activityCategoryData.values, function(activityCategoryDay) {
            return activityCategoryDay.value.activity_minutes;
          }),
        }

        return trace;
      })

      // TODO: add localization
      const layout = {
        title: 'Home resident activities',
      }

      Plotly.newPlot('homeActivityChart', data, layout)
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
