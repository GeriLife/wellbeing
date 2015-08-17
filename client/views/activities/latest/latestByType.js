Template.latestActivitiesByType.created = function () {
  // Subscribe to all activity types
  this.subscribe('allActivityTypes');
};

Template.latestActivitiesByType.helpers({
  'activityTypeOptions': function () {
    // Get all activity types
    activityTypes = ActivityTypes.find().fetch();

    return activityTypes;
  }
});
