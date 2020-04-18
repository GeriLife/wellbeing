Template.rolesSettings.created = function () {
  // Get reference to template instance
  const instance = this;
  instance.roles = new ReactiveVar(null);

  this.autorun(function () {
    const refreshFlag = Session.get('refresh-roles');
    if (refreshFlag) {
      Session.set('refresh-roles', false);
    }

    Meteor.call('getRolesExceptAdmin', function (err, rolesData) {
      instance.roles.set(rolesData);
    });
  });
};

Template.rolesSettings.helpers({
  roles: function () {
    return Template.instance().roles.get();
  }
});

Template.rolesSettings.events({
  'click #add-role': function () {
    // Show the add activity modal
    Modal.show('newRole');
  }
});
