Feelings = new Mongo.Collection("feelings");

Feelings.Schema = new SimpleSchema({
  residentId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  feeling: {
    type: String
  },
  date: {
    type: Date,
    autoValue: function () {
      // Get current date
      var currentDate = new Date();

      return currentDate;
    },
    autoform: {
      type: "hidden"
    }
  }
});

// Add i18n tags
ActivitiesSchema.i18n("feelings");

Feelings.attachSchema(Feelings.Schema);

Feelings.allow({
  insert: function () {
    return true;
  }
});
