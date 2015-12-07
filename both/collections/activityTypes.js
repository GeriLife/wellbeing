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

ActivityTypes.attachSchema(ActivityTypesSchema);
