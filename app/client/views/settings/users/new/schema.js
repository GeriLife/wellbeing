import SimpleSchema from 'simpl-schema';

NewUserSchema = new SimpleSchema({
  "email": {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.EmailWithTLD
  },
  "password": {
    type: String,
    min: 5
  },
  "isAdmin": {
    type: Boolean,
    defaultValue: false,
    label: "System administrator"
  },

  "deactivateOn": {
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
