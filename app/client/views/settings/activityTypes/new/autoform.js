AutoForm.addHooks(['newActivityTypeForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newActivityType');
    FlashMessages.clear();
  },
  onError(formType, error) {

    FlashMessages.sendError(error.message, { autoHide: true, hideDelay: 3000 });
  }
});
