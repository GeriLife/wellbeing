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
  }
});
