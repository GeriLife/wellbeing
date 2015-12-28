Feelings = new Mongo.Collection("feelings");

Feelings.Schema = new SimpleSchema({
  residentId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  feeling: {
    type: String
  }
});

Feelings.attachSchema(Feelings.Schema);
