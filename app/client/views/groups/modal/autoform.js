AutoForm.addHooks(['groupForm'], {
  onSuccess: function() {
    // Hide the modal dialogue
    Modal.hide('newGroup');
  },
  onError: function(formType, errorObj) {
    const { error } = errorObj;
    let message = errorObj.message;

    if (error === 500) {
      message = TAPi18n.__('homes-addNewGroup-duplicateName-errorMessage');
    }

    FlashMessages.sendError('<i class="fa fa-warning"></i> ' + message, {
      autoHide: true,
    });
  },
});
