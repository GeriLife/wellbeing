Template.activitiesTableActivityTypeFilter.onCreated(function () {
  // Initialize ReactiveTable filter for activity types
  this.filter = new ReactiveTable.Filter('typeFilter', ['activityTypeId']);
  const instance = this;
  instance.activityTypes = new ReactiveVar();

  Meteor.call('getAllActivityTypes', function (err, response) {
    instance.activityTypes.set(response);
  });
});

Template.activitiesTableActivityTypeFilter.events({
   "change #activity-type-filter": function (event, templateInstance) {
     // get selected activity type ID
     var activityTypeId = $(event.target).val();
     Session.set('reset-pagination', true);     
      // Set filter to contain resident ID
      templateInstance.filter.set(activityTypeId);
   }
});

Template.activitiesTableActivityTypeFilter.helpers({
  activityTypes () {
    return Template.instance().activityTypes.get();
  }
});
