Template.homeResidentActivitySumsByType.created = function () {
  // Get reference to template instance
  var instance = this;

  // set up home resident activity sums by type reactive variable
  var homeResidentsActivitySumsByType = new ReactiveVar();

  // Get home resident activity sums from server method
  Meteor.call('getHomeResidentsActivitySumsByType', function (error, activitySums) {
    //Set the home resident activity sums variable with the returned activity sums
    homeResidentsActivitySumsByType.set(activitySums);
  });
};

