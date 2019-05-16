Template.homes.created = function() {
  // Get reference to template instance
  const templateInstance = this;

  // Subscribe to all groups
  templateInstance.subscribe("currentUserGroups");
};

Template.homes.events({
  "click #new-group": function() {
    // Show the group modal (create new)
    Modal.show("groupModal");
  }
});

Template.homes.helpers({
  groups: function () {
    // Get all Groups
    const unsortedGroups = Groups.find().fetch();

    /* Sorting in mongo is case sensitive so sorting on data in meteor */
    return  _.sortBy(unsortedGroups, function (group) {
        return group.name.toLowerCase()
    })
  }
});
