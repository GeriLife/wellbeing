Template.report.onCreated(function () {
  const templateInstance = this;

  templateInstance.activityData = new ReactiveVar();

  // call method to retrieve aggregated activity data
  Meteor.call('getMonthlyAggregatedActivities', templateInstance.homeId, function (error, activityData) {
    console.log(activityData)
    // set activity data in the reactive variable
    templateInstance.activityData.set(activityData);
  })
});