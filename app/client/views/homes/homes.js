Template.homes.created = function() {
  // Get reference to template instance
  const templateInstance = this;

  // Subscribe to all groups
  templateInstance.subscribe("currentUserGroups");

  templateInstance.sortedGroups = new ReactiveVar();

  templateInstance.autorun(function() {
    // Get all Groups
    const unsortedGroups = Groups.find().fetch();

    /* Sorting in mongo is case sensitive so sorting on data in meteor */
    const sortedGroups = _.sortBy(unsortedGroups, function (group) {
        return group.name.toLowerCase()
    });

    templateInstance.sortedGroups.set(sortedGroups);
  });
};

Template.homes.events({
  "click #new-group": function() {
    // Show the group modal (create new)
    Modal.show("groupModal");
  }
});

Template.homes.helpers({
  groups: function () {
    const templateInstance = Template.instance();
    console.log(templateInstance)
    return templateInstance.sortedGroups.get();
  },
  showAlphabeticalSortingNotice () {
    const templateInstance = Template.instance();

    const groups = templateInstance.sortedGroups.get();

    // Show alphabetical sorting notice when more than one group
    return (groups.length > 1);
  },
});
