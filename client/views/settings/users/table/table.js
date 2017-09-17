Template.usersSettingsTable.helpers({
  tableSettings () {
    const tableSettings = {
      collection: Meteor.users,
      fields: [
        'emails.0.address',
        'emails.0.verified',
        'roles',
      ]
    };

    return tableSettings;
  },
});
