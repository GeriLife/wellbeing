AutoForm.addHooks('add-activity-form', {
    onSuccess: function(operation, resultId, template) {
        // Alert user that activity was added
        FlashMessages.sendSuccess('<i class="fa fa-check"></i> Activity added!');
    }
});

Template.addActivity.created = function () {
  this.subscribe('allResidents');
  this.subscribe('allHomes');
  this.subscribe('allActivityTypes');
}
