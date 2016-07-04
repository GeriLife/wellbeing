Template.residentsRecentActivityCountsAndMinutesChart.onCreated(function () {
  // Get reference to template instance
  var instance = this;

  // Create reactive variable to hold resident recent activitiy count and minutes
  instance.residentAcitivityCountsAndMinutes = new ReactiveVar();

  Meteor.call("getResidentsRecentActivityMinutesAndCountsByHome", function (error, residentActivityCountsAndMinutes) {
    instance.residentAcitivityCountsAndMinutes.set(residentActivityCountsAndMinutes);
  });
});
