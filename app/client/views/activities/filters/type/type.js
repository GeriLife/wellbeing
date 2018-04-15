Template.activitiesTableActivityTypeFilter.onCreated(function () {
  // Initialize ReactiveTable filter for activity types
  this.filter = new ReactiveTable.Filter('typeFilter', ['activityTypeId']);
});

Template.activitiesTableActivityTypeFilter.events({
   "change #activity-type-filter": function (event, templateInstance) {
     // get selected activity type ID
     var activityTypeId = $(event.target).val();

      // Set filter to contain resident ID
      templateInstance.filter.set(activityTypeId);
   }
});

Template.activitiesTableActivityTypeFilter.helpers({
  activityTypes () {
    // Get all activity types
    const activityTypes = ActivityTypes.find().fetch();

    return activityTypes;
  }
});
