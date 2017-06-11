const usersEnrollSchema = new SimpleSchema({
  message: {
    type: String,
    optional: false
  },
  emailAddresses: {
    type: [String],
    regEx: SimpleSchema.RegEx.Email,
    optional: false
  }
});

export default usersEnrollSchema;
