Template.activitiesTableResidentNamesFilter.onCreated(function() {
  // Initialize ReactiveTable filter for residents
  this.filter = new ReactiveTable.Filter("residentFilter", ["residentIds"]);

  const templateInstance = this
  templateInstance.residentsSelectOptions = new ReactiveVar(null);

  Meteor.call('residentNamesGroupedtByHomes',function(err,data){
    templateInstance.residentsSelectOptions.set(data)
  });

});

Template.activitiesTableResidentNamesFilter.events({
  "change #resident-filter": function(event, templateInstance) {
    // get selected resident ID
    var residentId = $(event.target).val();

    // Set filter to contain resident ID
    templateInstance.filter.set(residentId);
  }
});

Template.activitiesTableResidentNamesFilter.helpers({
  residentNamesGroupedtByHomes() {
    const templateInstance = Template.instance()

    return templateInstance.residentsSelectOptions.get();
  }
});
