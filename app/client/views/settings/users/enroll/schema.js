import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(["autoform"]);

AutoForm.addInputType("dropdown", {
  template: "quickForm_dropdown",
  valueIsArray: true,
  valueOut() {
    return this.val();
  }
});

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
      // Remove field label
      label: undefined,

      autoform: {
        type: "dropdown",
        options: groups
      }
    },
    "groups.$": {
      type: String
    }
  });
};

export default usersEnrollSchema;
