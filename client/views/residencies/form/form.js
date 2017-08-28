Template.residencyForm.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Subscribe to all residents, for the resident select options
  templateInstance.subscribe('allResidents');

  // Subscribe to all homes, for the home select options
  templateInstance.subscribe('allHomes');

  // Subscribe to all groups, so homes can be grouped in select menu
  templateInstance.subscribe('allGroups');
});

Template.residencyForm.helpers({
  'today': function () {
    // Default date today, as a string
    return Date();
  },
});
