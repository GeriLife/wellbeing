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
};

Template.activities.events({
  "change [name='all-or-latest']": function (event, template) {
    // Get reference to template instance
    var instance = Template.instance();

    // Set reactive variable with value of all-or-latest toggle
    instance.showLatestActivities.set(instance.allOrLatestToggle.checked);
  }
});
