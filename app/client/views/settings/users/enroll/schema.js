import SimpleSchema from 'simpl-schema';

const usersEnrollSchema = new SimpleSchema({
  subject: {
    type: String,
    // suggested maximum length of email subject
    // https://stackoverflow.com/a/1592310/1191545
    max: 78
  },
  message: {
    type: String,
    optional: false
  },
  emailAddresses: {
    type: Array,
    optional: false
  },
  'emailAddresses.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  }
});

export default usersEnrollSchema;
