Template.usersSettingsTable.onCreated(function () {
  // Get reference to Template instance
  const instance = this;
  instance.users = ReactiveVar([]);

  Meteor.call('getUserList', function (err, userList) {
    if (!err) {
      instance.users.set(userList);
    }
  });
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
  fieldId: 5,
};

Template.usersSettingsTable.helpers({
  tableSettings() {
    return {
      collection: Template.instance().users.get(),
      fields: [
        {
          key: 'emails.0.address',
          fieldId: 1,

          label: TAPi18n.__('usersSettingsTable-tableHeaders-email'),
        },
        isActiveKey,
        {
          fieldId: 2,

          label: TAPi18n.__(
            'usersSettingsTable-tableHeaders-passwordActive'
          ),
          tmpl: Template.usersSettingsTablePasswordActive,
        },
        {
          key: 'roles',
          fieldId: 3,

          label: TAPi18n.__('usersSettingsTable-tableHeaders-roles'),
        },
        {
          fieldId: 4,

          label: TAPi18n.__(
            'usersSettingsTable-tableHeaders-actions'
          ),
          tmpl: Template.usersSettingsTableActions,
        },
      ],
    };
  },
});
