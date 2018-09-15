Template.homeResidentActivitySummaryCharts.onCreated(function() {
  // get reference to template instance
  const templateInstance = this;

  // Create reactive variables to hold activity metric and period
  templateInstance.activityMetric = new ReactiveVar();
  templateInstance.activityPeriod = new ReactiveVar();
});

Template.homeResidentActivitySummaryCharts.onRendered(function() {
  // get reference to template instance
  const templateInstance = this;

  // Get initial values for reactive variables from template
  const activityMetric = templateInstance.find('input[name="activityMetric"]').value;
  const activityPeriod = templateInstance.find('input[name="activityPeriod"]').value;

  // Set reactive variables to initial values from template
  templateInstance.activityMetric.set(activityMetric);
  templateInstance.activityPeriod.set(activityPeriod);
});

Template.homeResidentActivitySummaryCharts.events({
  'change input[name="activityMetric"]' (event, templateInstance) {
    const activityMetric = event.currentTarget.value;

    templateInstance.activityMetric.set(activityMetric);
  },
  'change input[name="activityPeriod"]' (event, templateInstance) {
    const activityPeriod = event.currentTarget.value;

    templateInstance.activityPeriod.set(activityPeriod);
  },
});

Template.homeResidentActivitySummaryCharts.helpers({
  activityMetric () {
    // get reference to template instance
    const templateInstance = Template.instance();

    return templateInstance.activityMetric.get()
  },
  activityPeriod () {
    // get reference to template instance
    const templateInstance = Template.instance();

    return templateInstance.activityPeriod.get()
  }
})
