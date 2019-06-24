AutoForm.addHooks(['groupForm'], {
  onSuccess: function() {
    // Hide the modal dialogue
    Modal.hide('newGroup');
  },
  onError: function(formType, error) {
    FlashMessages.sendError('<i class="fa fa-warning"></i> ' + error.message, {
      autoHide: true,
    });
  },
});
