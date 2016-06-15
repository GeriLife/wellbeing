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
    // Get the user agent type
    var deviceAgent = navigator.userAgent.toLowerCase();

    // Check if the device is iOS
    var iOS = deviceAgent.match(/(iPad|iPhone|iPod)/i);

    // If the device is not iOS, render the chosen select widget
    if (!iOS) {
      // Get a reference to the resident select field
      const residentSelect = $('[name=residentIds]');

      // Activate the improved multi-select widget
      residentSelect.chosen();
    };
  }
});
