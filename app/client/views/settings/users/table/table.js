Template.usersSettingsTable.onCreated(function() {
  // Get reference to Template instance
  var instance = this;

  // Subscribe to all users
  instance.subscribe('allUsers');
});

function setActiveFlagValue(value) {
  /* Set values as no if is active flag is false
     Active in all other cases.
  */
  return value === false ? 'No' : 'Yes';
}

const isActiveKey = {
  key: 'isActive',
  label: TAPi18n.__('usersSettingsTable-tableHeaders-isActive'),
  fn: setActiveFlagValue,
};

Template.usersSettingsTable.helpers({
  tableSettings() {
    return {
      collection: Meteor.users,
      fields: [
        {
          key: 'emails.0.address',
          label: TAPi18n.__('usersSettingsTable-tableHeaders-email'),
        },
        isActiveKey,
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
      ],
    };
  },
});
