import _ from 'lodash';
import moment from 'moment';

Template.report.onCreated(function() {
  const templateInstance = this;

  templateInstance.activityDataByType = new ReactiveVar();
  templateInstance.activityDataByRole = new ReactiveVar();
  templateInstance.activityMetric = new ReactiveVar();
  templateInstance.timePeriod = new ReactiveVar();
  templateInstance.barMode = new ReactiveVar('stack');
  templateInstance.lastUpdatedActivityType = new ReactiveVar();
  templateInstance.lastUpdatedActivityRole = new ReactiveVar();
});

Template.report.onRendered(function() {
  const templateInstance = this;

  // Set initial activity metric from template
  const activityMetric = $(
    'input[name="activityMetric"]:checked'
  ).val();
  templateInstance.activityMetric.set(activityMetric);

  // Set initial time period from template
  const timePeriod = $('input[name="timePeriod"]:checked').val();
  templateInstance.timePeriod.set(timePeriod);

  // fetch chart data in reactive context
  templateInstance.autorun(function() {
    const timePeriod = templateInstance.timePeriod.get();

    // call method to retrieve aggregated activity data
    Meteor.call(
      'getActivitiesAggregateReport',
      timePeriod,
      'type',
      function(error, { activityData, lastUpdated }) {
        // set activity data in the reactive variable
        templateInstance.activityDataByType.set(activityData);
        templateInstance.lastUpdatedActivityType.set(lastUpdated);
      }
    );

    Meteor.call(
      'getActivitiesAggregateReport',
      timePeriod,
      'facilitator',
      function(error, { activityData, lastUpdated }) {
        // set activity data in the reactive variable
        templateInstance.activityDataByRole.set(activityData);
        templateInstance.lastUpdatedActivityRole.set(lastUpdated);
      }
    );
  });

  // Render chart in reactive context
  templateInstance.autorun(() => {
    const activityDataByRole = templateInstance.activityDataByRole.get();
    const activityDataByType = templateInstance.activityDataByType.get();
    prepareChartData(
      templateInstance,
      activityDataByType,
      'residentsActivitiesChartByType'
    );
    prepareChartData(
      templateInstance,
      activityDataByRole,
      'residentsActivitiesChartByRole'
    );
  });
});

Template.report.events({
  'change #activityMetric'(event, templateInstance) {
    const activityMetric = $(
      'input[name="activityMetric"]:checked'
    ).val();

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

Template.report.helpers({
  isGroupMode() {
    const barMode = Template.instance().barMode.get();
    return barMode === 'group';
  },
  lastUpdatedType() {
    const instance = Template.instance();
    return moment(instance.lastUpdatedActivityType.get()).format(
      'DD-MM-YYYY'
    );
  },
  lastUpdatedRole() {
    const instance = Template.instance();
    return moment(instance.lastUpdatedActivityRole.get()).format(
      'DD-MM-YYYY'
    );
  },
});

function prepareChartData(templateInstance, activityData, chartName) {
  const activityMetric = templateInstance.activityMetric.get();
  const barmode = templateInstance.barMode.get();

  // Make sure we have some activity data
  if (!activityData) return;
  // Chart data consists of multiple traces
  const data = _.map(activityData, activityCategoryData => {
    // Create a trace for each activity type
    return {
      type: 'bar',
      name: activityCategoryData.key,
      // X values are activity dates
      x: _.map(activityCategoryData.values, activityCategoryDay => {
        return new Date(activityCategoryDay.key);
      }),
      // Y values are (currently) activity minutes
      // TODO: add page element to toggle between activity counts and minutes
      y: _.map(activityCategoryData.values, activityCategoryDay => {
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
      title: TAPi18n.__(
        `reportPageActivitiesChart-yaxis-${activityMetric}`
      ),
    },
    barmode,
  };

  // Get client locale
  const locale = TAPi18n.getLanguage();

  // Render plot
  Plotly.newPlot(chartName, data, layout, { locale });
}
