Meteor.publish("singleSetting", function (settingName) {
  // Get cursor to setting specified by name
  var singleSetting = Settings.find({name: settingName});

  return singleSetting;
});
