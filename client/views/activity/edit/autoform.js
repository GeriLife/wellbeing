Template.autoForm.onRendered(function () {
  const instance = this;

  // Make sure the new activity form is being rendered
  if (instance.data.id === "editActivityForm") {
    // Get a reference to the resident select field
    const residentSelect = $('[name=residentIds]');

    // Activate the improved multi-select widget
    residentSelect.selectpicker({
      header: "Select resident(s)"
    });
  }
});

AutoForm.addHooks(['editActivityForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('editActivity');

    const successMessage = TAPi18n.__("editActivity-success");

    const successMessageWithIcon = '<i class="fa fa-check"></i> ' + successMessage

    // Alert user that activity was added
    FlashMessages.sendSuccess(successMessageWithIcon);
  }
});
