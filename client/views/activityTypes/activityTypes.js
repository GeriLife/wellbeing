Template.activityTypes.created = function () {
  // Get reference to template instance
  var instace = this;

  instance.subscribe('allActivityTypes');
};

Template.activityTypes.helpers({
  "activityTypes": function () {
    // Get all activity types
    var activityTypes = ActivityTypes.find().fetch();

    return activityTypes;
  }
});
