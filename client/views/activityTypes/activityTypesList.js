Template.activityTypesList.created = function () {
  // Get reference to template instance
  var instance = this;

  instance.subscribe('allActivityTypes');
};

Template.activityTypesList.helpers({
  "activityTypes": function () {
    // Get all activity types
    var activityTypes = ActivityTypes.find({}, {sort: {name: 1}}).fetch();

    return activityTypes;
  }
});

Template.activityTypesList.events({
  'click #add-activity-type': function () {
    // Show the add activity modal
    Modal.show('newActivityType');
  }
});
