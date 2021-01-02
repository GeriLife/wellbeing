Template.dateTimeSettings.rendered = function() {
  // Get reference to template instance
  var instance = this;

  // Add timezones to the timezone select box
  $('#timezone-select').timezones();

  // Populate timezone select with current setting, if available
  instance.autorun(function() {
    // Get current timezone setting
    Meteor.call('getTimezone', function(error, timezoneSetting) {
      // Check for current setting
      if (!error && timezoneSetting) {
        // Set the value of the timezone select
        $('#timezone-select').val(timezoneSetting.value);
      }
    });
  });
};

Template.dateTimeSettings.events({
  'submit #timezone-form': function(event) {
    // Prevent page from refreshing
    event.preventDefault();

    // Get selected timezone from form
    var selectedTimezone = $('#timezone-select').val();
    Meteor.call('createOrEditTimezoneSettings', selectedTimezone);
  },
});
