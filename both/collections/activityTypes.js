ActivityTypes = new Mongo.Collection('activityTypes');

var ActivityTypesSchema = new SimpleSchema({
  name: {
    type: String
  }
});

ActivityTypes.allow({
  insert: function () {
    return true;
  }
});

// Add i18n tags
ActivitiesSchema.i18n("activityTypes");

ActivityTypes.attachSchema(ActivityTypesSchema);
