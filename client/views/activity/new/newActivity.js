Template.newActivity.created = function () {
  this.subscribe('allCurrentResidents');
  this.subscribe('allHomes');
  this.subscribe('allActivityTypes');
  this.subscribe('allRolesExceptAdmin');
};


Template.autoForm.onRendered(function () {
  const instance = this;

  // Make sure the new activity form is being rendered
  if (instance.data.id === "newActivityForm") {
    // Get a reference to the resident select field
    const residentSelect = $('[name=residentIds]');

    // Activate the improved multi-select widget
    residentSelect.selectpicker({
      header: "Select resident(s)"
    });
  }
});
