Template.activitiesTableActivityTypeCell.helpers({
  activityType () {
    // Get activity type document
    const activityType = ActivityTypes.findOne(this.activityTypeId);

    return activityType;
  }
});
