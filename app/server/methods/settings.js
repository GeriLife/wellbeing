Meteor.methods({
  createOrEditTimezoneSettingsApi({ selectedTimezone }) {
    return Meteor.call(
      'createOrEditTimezoneSettings',
      selectedTimezone,
      this.userId
    );
  },

  createOrEditTimezoneSettings(selectedTimezone, userId) {
    if (!Roles.userIsInRole(userId || Meteor.userId(), ['admin'])) {
      throw new Meteor.Error(500, 'Operation Not Allowed');
    }

    // Get current timezone setting
    const timezoneSetting = Settings.findOne({ name: 'timezone' });

    // Check if timezone setting exists, update or insert depending
    if (timezoneSetting) {
      // Update the existing timezone setting
      Settings.update(timezoneSetting._id, {
        $set: { value: selectedTimezone },
      });
    } else {
      // Insert a new timezone setting
      Settings.insert({ name: 'timezone', value: selectedTimezone });
    }
  },

  getTimezone() {
    if (!Roles.userIsInRole(this.userId || Meteor.userId(), ['admin'])) {
      throw new Meteor.Error(500, 'Operation Not Allowed');
    }

    return Settings.findOne({
      name: 'timezone',
    });
  },
});
