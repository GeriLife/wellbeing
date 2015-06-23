ActivityTypes = new Mongo.Collection('activityTypes');

var ActivityTypesSchema = new SimpleSchema({
  name: {
    type: String
  }
});

ActivityTypes.attachSchema(ActivityTypesSchema);
