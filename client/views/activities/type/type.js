Template.activitiesTableActivityTypeCell.helpers({
  activityType () {
    // Get activity document
    const activity = Activities.findOne(this._id);

    // Get activity type
    const activityType = activity.activityType();

    return activityType;
  }
});
