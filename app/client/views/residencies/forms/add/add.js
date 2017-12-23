import newResidentAndResidencySchema from '/both/schemas/newResidentAndResidencySchema';

Template.addResidencyModal.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Subscribe to all residents, for the resident select options
  templateInstance.subscribe('allResidents');

  // Subscribe to all homes, for the home select options
  templateInstance.subscribe('allHomes');

  // Subscribe to all groups, so homes can be grouped in select menu
  templateInstance.subscribe('allGroups');

  // Create reactive variable to hold state of 'new or existing resident' radio
  // initialize to 'new' to match template markup
  templateInstance.newOrExistingResident = new ReactiveVar('new');
});

Template.addResidencyModal.helpers({
  today () {
    // Default date today, as a string
    return Date();
  },
  addingResidencyForExistingResident () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Get value of 'new or existing resident' reactive variable
    const newOrExistingResident = templateInstance.newOrExistingResident.get();

    if (newOrExistingResident === 'existing') {
      // adding residency for existing user is true
      return true;
    }

    // otherwise return false
    return false;
  },
  newResidentAndResidencySchema () {
    return newResidentAndResidencySchema;
  },
  homeIdOptions: function() {
    // Get all Groups
    var groups = Groups.find().fetch();

    // Create an array of Group IDs
    var groupIDs = _.map(groups, function (group) {
      return group._id;
    });

    // Create select options for Homes input
    // Grouping homes by group
    var homeSelectOptions = _.map(groupIDs, function (groupId) {
      // Find the name of this group
      var groupName = Groups.findOne(groupId).name;

      // Get all homes of this group
      var groupHomes = Homes.find({groupId: groupId}).fetch();

      // Create a homes array with name/ID pairs for label/value
      var homesOptions = _.map(groupHomes, function (groupHome) {
        // Combine resident first name and last initial
        var homeName = groupHome.name;

        // Create option for this home, with home ID as the value
        return {label: homeName, value: groupHome._id};
      });

      // Return residents and home as option group
      return {optgroup: groupName, options: homesOptions};
    });

    return homeSelectOptions;
  },
});

Template.addResidencyModal.events({
  'change [name=new-or-existing]' (event, templateInstance) {
    // Get selected value of 'new or existing resident' radio
    const newOrExistingResident = event.target.value;

    // Update 'new or existing resident' reactive variable
    templateInstance.newOrExistingResident.set(newOrExistingResident);
  }
});
