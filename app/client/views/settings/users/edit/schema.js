EditUserSchema = new SimpleSchema({
  "email": {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email
  },
  "isAdmin": {
    type: Boolean,
    defaultValue: false
  }
});

// Add i18n tags
EditUserSchema.i18n("editUser");
