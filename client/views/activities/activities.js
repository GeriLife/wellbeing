Template.activities.created = function () {
  var showLatestActivities = new ReactiveVar();
};

Template.activities.rendered = function () {
  var elem = document.querySelector("[name='all-or-latest']");
  var init = new Switchery(elem);
};
