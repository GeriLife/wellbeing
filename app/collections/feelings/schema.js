import SimpleSchema from 'simpl-schema';

export default FeelingsSchema = new SimpleSchema({
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
  }
});
