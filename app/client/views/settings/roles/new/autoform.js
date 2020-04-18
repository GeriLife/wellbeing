AutoForm.addHooks(['newRoleForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newActivityType');
    Session.set('refresh-roles', true);
    FlashMessages.clear();
  },
  onError(formType,error){
    FlashMessages.sendError(error.message, { autoHide: true, hideDelay: 3000 });
  }
});
