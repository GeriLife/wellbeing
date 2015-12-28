Template.newActivity.created = function () {
  this.subscribe('allResidents');
  this.subscribe('allHomes');
  this.subscribe('allActivityTypes');
};
