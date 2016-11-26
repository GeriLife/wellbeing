Template.newActivity.created = function () {
  this.subscribe('allCurrentResidents');
  this.subscribe('allHomes');
  this.subscribe('allActivityTypes');
  this.subscribe('allRolesExceptAdmin');
};

Template.newActivity.helpers({
  'today': function () {
    // Default date today, as a string
    return Date();
  },
});
