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
          key: 'emails.0.verified',
          label: TAPi18n.__('usersSettingsTable-tableHeaders-verified'),
        },
        {
          key: 'roles',
          label: TAPi18n.__('usersSettingsTable-tableHeaders-roles'),
        },
      ]
    };

    return tableSettings;
  },
});
