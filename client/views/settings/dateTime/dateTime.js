Template.dateTimeSettings.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to timezone setting
  instance.subscribe("singleSetting", "timezone");
};

Template.dateTimeSettings.rendered = function () {
  // Add timezones to the timezone select box
  $('#timezone-select').timezones();
};

Template.dateTimeSettings.events({
  "submit #timezone-form": function (event) {
    // Prevent page from refreshing
    event.preventDefault();

    // Get selected timezone from form
    var selectedTimezone = $("#timezone-select").val();

    // Get current timezone setting
    var timezoneSetting = Settings.findOne({name: "timezone"});

    // Check if timezone setting exists, update or insert depending
    if (timezoneSetting) {
      // Update the existing timezone setting
      Settings.update(timezoneSetting._id, {$set: {value: selectedTimezone}});
    } else {
      // Insert a new timezone setting
      Settings.insert({name: "timezone", value: selectedTimezone});
    }
  }
});
