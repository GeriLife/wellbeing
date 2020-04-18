Template.activityTypesSettings.created = function () {
  // Get reference to template instance
  var instance = this;
  instance.activityTypes = new ReactiveVar();

  this.autorun(function () {
    const refreshFlag = Session.get('refresh-activitytype-list');

    if (refreshFlag) {
      Session.set('refresh-activitytype-list', false);
    }

    Meteor.call('getAllActivityTypes', function (err, types) {
      if (!err) {
        instance.activityTypes.set(types);
      }
    });
  });
};

Template.activityTypesSettings.helpers({
  activityTypes: function () {
    return Template.instance().activityTypes.get();
  },
});

Template.activityTypesSettings.events({
  'click #add-activity-type': function () {
    // Show the add activity modal
    Modal.show('newActivityType');
  },
});
