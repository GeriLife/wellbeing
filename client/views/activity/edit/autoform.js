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
