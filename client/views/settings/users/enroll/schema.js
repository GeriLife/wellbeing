const enrollUsersSchema = new SimpleSchema({
  message: {
    type: String,
    optional: false
  },
  emailAddresses: {
    type: [String],
    optional: false
  }
});

export default enrollUsersSchema;
