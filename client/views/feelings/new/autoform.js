AutoForm.addHooks(['newFeelingForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newFeeling');

    // Alert user that feeling was recorded
    FlashMessages.sendSuccess('<i class="fa fa-check"></i> Feeling recorded.');
  }
});
