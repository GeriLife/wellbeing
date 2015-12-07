Template.activityTypes.created = function () {
  // Get reference to template instance
  var instace = this;

  instance.subscribe('allActivityTypes');
};
