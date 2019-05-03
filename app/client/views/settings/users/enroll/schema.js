import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(["autoform"]);

const usersEnrollSchema = function(groups) {
  return new SimpleSchema({
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
    "emailAddresses.$": {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    groups: {
      type: Array,
      optional: true,

      label: "Add group",

      autoform: {
        type: "select2",
        multiple: true,
        options: groups.map(r => {
          return {
            label: r.name,
            value: r._id
          };
        })
      }
    },
    "groups.$": {
      type: String
    }
  });
};

export default usersEnrollSchema;
