Template.newActivity.created = function () {
  this.subscribe('allCurrentResidents');
  this.subscribe('allHomes');
  this.subscribe('allActivityTypes');
  this.subscribe('allRolesExceptAdmin');
};

Template.newActivity.helpers({
  select2Options () {
    return {
      multiple: true
    }
  }
});
