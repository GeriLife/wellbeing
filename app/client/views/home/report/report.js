import _ from "lodash";

Template.homeReport.onCreated(function() {
  // get a reference to template instance
  const templateInstance = this;

  // Get Home ID from template instance
  templateInstance.homeId = Router.current().params.homeId;

  // Get home data for page elements
  templateInstance.subscribe("singleHome", templateInstance.homeId);

  // set reactive variable to hold chart data (attached to template instance)
  templateInstance.activityData = new ReactiveVar();
  templateInstance.activityMetric = new ReactiveVar();
  templateInstance.timePeriod = new ReactiveVar();
  templateInstance.barMode = new ReactiveVar('group');
});

Template.homeReport.onRendered(function() {
  const templateInstance = this;

  // Set initial activity metric from template
  const activityMetric = $('input[name="activityMetric"]:checked').val();
  templateInstance.activityMetric.set(activityMetric);

  // Set initial time period from template
  const timePeriod = $('input[name="timePeriod"]:checked').val();
  templateInstance.timePeriod.set(timePeriod);

  templateInstance.autorun(function() {
    const timePeriod = templateInstance.timePeriod.get();
    const homeId = templateInstance.homeId;

    // call method to retrieve aggregated activity data
    Meteor.call(
      "getMonthlyAggregatedHomeResidentActivities",
      homeId,
      timePeriod,
      function(error, activities) {
        // set activity data in the reactive variable
        templateInstance.activityData.set(activities);
      }
    );
  });

  templateInstance.autorun(function() {
    const activityData = templateInstance.activityData.get();
    const activityMetric = templateInstance.activityMetric.get();
    const barmode = templateInstance.barMode.get();

    // Make sure we have some activity data
    if (activityData) {
      // Chart data consists of multiple traces
      const data = _.map(activityData, function(activityCategoryData) {
        // Create a trace for each activity type
        const trace = {
          type: "bar",
          name: activityCategoryData.key,
          // X values are activity dates
          x: _.map(activityCategoryData.values, function(activityCategoryDay) {
            return new Date(activityCategoryDay.key);
          }),
          // Y values toggle between activity counts and minutes
          y: _.map(activityCategoryData.values, function(activityCategoryDay) {
            return activityCategoryDay.value[activityMetric];
          })
        };

        return trace;
      });

      // Add plot layout configuration
      const layout = {
        title: TAPi18n.__("homeResidentsActivitiesChart-title"),
        xaxis: {
          title: TAPi18n.__("reportPageActivitiesChart-xaxis-title")
        },
        yaxis: {
          title: TAPi18n.__(
            `homeResidentsActivitiesChart-yaxis-${activityMetric}`
          )
        },
        barmode
      };

      // Get client locale
      const locale = TAPi18n.getLanguage();

      // Render plot
      Plotly.newPlot("homeResidentsActivitiesChart", data, layout, { locale });
    }
  });
});

Template.homeReport.helpers({
  home: function() {
    // Create reference to template instance
    const templateInstance = Template.instance();

    const homeId = templateInstance.homeId;

    // Return current Home
    return Homes.findOne(homeId);
  },
  isGroupMode() {
    const barMode = Template.instance().barMode.get();
    return barMode === 'group'
  }
});

Template.homeReport.events({
  "change #activityMetric"(event, templateInstance) {
    const activityMetric = $('input[name="activityMetric"]:checked').val();

    templateInstance.activityMetric.set(activityMetric);
  },
  "change #barMode"(event, templateInstance) {
    const barMode = $('input[name="barMode"]:checked').val();

    templateInstance.barMode.set(barMode);
  },
  "change #timePeriod"(event, templateInstance) {
    const timePeriod = $('input[name="timePeriod"]:checked').val();

    templateInstance.timePeriod.set(timePeriod);
  }
});
