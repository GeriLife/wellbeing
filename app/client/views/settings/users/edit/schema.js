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
    min: new Date(),
  },
});
