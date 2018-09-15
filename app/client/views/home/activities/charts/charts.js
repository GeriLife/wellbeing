Template.homeResidentActivitySummaryCharts.events({
  'change input[name="activityMetric"]' (event) {
    console.log(event.currentTarget.value)
  },
  'change input[name="activityPeriod"]' (event) {
    console.log(event.currentTarget.value)
  },
});
