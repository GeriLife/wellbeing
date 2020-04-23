AutoForm.addHooks(['groupForm'], {
  onSuccess: function() {
    Session.set('refresh-data', true);

    // Hide the modal dialogue
    Modal.hide('newGroup');
    FlashMessages.clear();
  },
  onError: function(formType, error) {
    FlashMessages.sendError('<i class="fa fa-warning"></i> ' + error.message, {
      autoHide: true,
      hideDelay: 3000
    });
  },
});
