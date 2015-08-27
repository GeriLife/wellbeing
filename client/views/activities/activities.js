Template.activities.created = function () {
  // Get reference to template instance
  var instance = this;

  instance.showLatestActivities = new ReactiveVar();
};

Template.activities.rendered = function () {
  // Get reference to template instance
  var instance = this;

  // Set options for toggle switch
  var options = {secondaryColor: 'silver'};
  instance.allOrLatestToggle = document.querySelector("[name='all-or-latest']");
  instance.switch = new Switchery(instance.allOrLatestToggle, options);

  // Get the value of latest activities toggle
  var allOrLatestToggle = instance.allOrLatestToggle.checked;

  // Set the value of show latest activities reactive variable
  instance.showLatestActivities.set(allOrLatestToggle);
};

Template.activities.events({
  "change [name='all-or-latest']": function (event, template) {
    // Get reference to template instance
    var instance = Template.instance();

    // Set reactive variable with value of all-or-latest toggle
    instance.showLatestActivities.set(instance.allOrLatestToggle.checked);
  }
});


Template.activities.helpers({
  'showLatestActivities': function () {
    // Get reference to template instance
    var instance = Template.instance();

    // Return value of show latest activities toggle
    return instance.showLatestActivities.get();
  }
});
