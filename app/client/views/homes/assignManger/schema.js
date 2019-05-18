import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(["autoform"]);

const assignManagerSchema = function(users, groupId) {
  return new SimpleSchema({
    groupId: {
      type: String,
      optional: false,
      autoform: {
        value: groupId,
        type: "hidden",
        label: false
      }
    },
    userId: {
      type: String,
      optional: false,
      autoform: {
        options: users
      }
    }
  });
};

export default assignManagerSchema;
