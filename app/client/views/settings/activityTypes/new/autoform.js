AutoForm.addHooks(['newActivityTypeForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newActivityType');
    Session.set('refresh-activitytype-list',true);
    FlashMessages.clear();
  },
  onError(formType, error) {

    FlashMessages.sendError(error.message, { autoHide: true, hideDelay: 3000 });
  }
});
