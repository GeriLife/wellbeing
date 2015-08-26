Template.allActivities.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to all activities and related collections
  instance.subscribe("activitiesComposite");
};
