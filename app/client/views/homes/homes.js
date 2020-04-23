Template.homes.created = function() {
  // Get reference to template instance
  const templateInstance = this;
  templateInstance.sortedGroups = new ReactiveVar(null);

  templateInstance.autorun(function () {
    const refreshFlag = Session.get('refresh-data');

    if (refreshFlag) {
      Session.set('refresh-data', false);
    }

    Meteor.call('currentUserGroups', function (
      err,
      userVisibleGroups
    ) {
      if (!err) {
        templateInstance.sortedGroups.set(userVisibleGroups);
      }
    });
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

    return templateInstance.sortedGroups.get();
  },

  groupsLoaded() {
    return Template.instance().sortedGroups.get() !== null;
  },

  showAlphabeticalSortingNotice () {
    /*
    Show alphabetical sorting notice 
    when more than one group
    */
    const templateInstance = Template.instance();

    const groups = templateInstance.sortedGroups.get();

    return (groups.length > 1);
  },
});
