Template.editHome.helpers({
  'home': function () {
    // Get Home ID from template data context
    // convert the 'String' object to a string for the DB query
    var homeId = this._id;

    // Get home document
    var home = Homes.findOne(homeId);

    return home;
  }
});

Template.editHome.created = function () {
  var instance = this;

  var router = Router.current();

  var homeId = router.params.homeId;

  instance.subscribe('singleHome', homeId);
  instance.subscribe('allGroups');
};

AutoForm.addHooks(['editHomeForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('editHome');
  }
});
