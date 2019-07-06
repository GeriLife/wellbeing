import SimpleSchema from 'simpl-schema';

EditUserSchema = new SimpleSchema({
  email: {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
  },
  isAdmin: {
    type: Boolean,
    defaultValue: false,
  },
  deactivateOn: {
    type: Date,
    optional: true,
    min: function() {
      const date = new Date();
      const utcDate = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
      );

      return new Date(utcDate);
    },
    max: new Date('2050'),
  },
});
