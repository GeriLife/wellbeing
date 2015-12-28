AutoForm.addHooks(['newActivityForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newActivity');

    // Alert user that activity was added
    FlashMessages.sendSuccess('<i class="fa fa-check"></i> Activity added!');
  }
});
