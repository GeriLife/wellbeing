Template.usersSettingsTable.onCreated(function () {
  // Get reference to Template instance
  var instance = this;

  // Subscribe to all users
  instance.subscribe("allUsers");
});

Template.usersSettingsTable.helpers({
  tableSettings () {
    const tableSettings = {
      collection: Meteor.users,
      fields: [
        {
          key: 'emails.0.address',
          label: TAPi18n.__('usersSettingsTable-tableHeaders-email'),
        },
        {
          label: TAPi18n.__('usersSettingsTable-tableHeaders-passwordActive'),
          tmpl: Template.usersSettingsTablePasswordActive,
        },
        {
          key: 'roles',
          label: TAPi18n.__('usersSettingsTable-tableHeaders-roles'),
        },
        {
          label: TAPi18n.__('usersSettingsTable-tableHeaders-actions'),
          tmpl: Template.usersSettingsTableActions,
        },
      ]
    };

    return tableSettings;
  },
});
