Template.activitiesTableActivityTypeCell.onCreated(function () {
  const instance = this;
  instance.activityType = new ReactiveVar(null);

  Meteor.call(
    'getActivityTypeData',
    this.data.activityTypeId,
    function (err, activityTypeData) {
      instance.activityType.set(activityTypeData);
    }
  );
});

Template.activitiesTableActivityTypeCell.helpers({
  activityType() {
    return Template.instance().activityType.get();
  },
});
