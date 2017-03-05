Template.activitiesTableActivityTypeCell.helpers({
  activityType () {
    // Get activity document
    const activityType = ActivityTypes.findOne(this.activityTypeId);

    return activityType;
  }
});
