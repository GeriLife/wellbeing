AutoForm.addHooks(['newFeelingForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newFeeling');

    // Get success message translation
    const successMessage = TAPi18n.__("newFeeling-success");

    // Alert user that feeling was recorded
    FlashMessages.sendSuccess('<i class="fa fa-check"></i> ' + successMessage);
  }
});
