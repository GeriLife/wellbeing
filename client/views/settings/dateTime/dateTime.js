Template.dateTimeSettings.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to timezone setting
  instance.subscribe("singleSetting", "timezone");
};

Template.dateTimeSettings.rendered = function () {
  // Get reference to template instance
  var instance = this;

  // Add timezones to the timezone select box
  $('#timezone-select').timezones();

  // Populate timezone select with current setting, if available
  instance.autorun(function () {
    // Get current timezone setting
    var timezoneSetting = Settings.find({name: "timezone"}).fetch()[0];

    // Check for current setting
    if (timezoneSetting) {
      // Set the value of the timezone select
      $('#timezone-select').val(timezoneSetting.value);
    }
  });
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
