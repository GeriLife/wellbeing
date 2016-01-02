Settings = new Mongo.Collection("settings");

Settings.allow({
  insert: function () {
    // Get a count of settings documents
    var settingsCount = Settings.find().count();

    // Make sure only one settings document exists
    if (settingsCount === 0) {
      // Get ID of current Meteor user
      var userId = Meteor.userId();
      
      // Only allow admin users to insert settings
      return Roles.userIsInRole(userId, ['admin']);
    }
  },
  update: function () {
    // Only allow admin users to update settings
    return Roles.userIsInRole(userId, ['admin']);
  }
});
