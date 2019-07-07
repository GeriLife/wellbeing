AutoForm.addHooks(['newHomeForm'], {
  onSuccess: function() {
    // Hide the modal dialogue
    Modal.hide('newHome');
    FlashMessages.clear();
  },
  onError: function(formType, error) {
    FlashMessages.sendError('<i class="fa fa-warning"></i> ' + error.message, {
      autoHide: true,
      hideDelay: 3000
    });
  },
});
