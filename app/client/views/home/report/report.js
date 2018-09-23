Template.homeReport.onCreated(function () {
  // get a reference to template instance
  const templateInstance = this;

  // set reactive variable to hold chart data (attached to template instance)
  templateInstance.activityData = new ReactiveVar();

  // call method to retrieve aggregated activity data
  // Get Home ID
  templateInstance.homeId = Router.current().params.homeId;

  Meteor.call('getDailyAggregatedHomeResidentActivities', templateInstance.homeId, function (error, activities) {
    // set activity data in the reactive variable
    templateInstance.activityData.set(activities);
  })
});
