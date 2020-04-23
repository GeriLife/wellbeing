AutoForm.addHooks(['editHomeForm'], {
  onSuccess: function() {
    Session.set('refresh-data', true);

    // Hide the modal dialogue
    Modal.hide('editHome');
    FlashMessages.clear();
  },
  onError: function(formType, error) {
    FlashMessages.sendError('<i class="fa fa-warning"></i> ' + error.message, {
      autoHide: true,
      hideDelay: 3000
    });
  },
});
