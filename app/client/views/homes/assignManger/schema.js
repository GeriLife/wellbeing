import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(["autoform"]);

const assignManagerSchema = function(groupId) {
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
        options: function getAssignManagerSchemaUsers() {
          const users = Meteor.users
            .find()
            .fetch()
            .map(user => {
              let address = "Unknown";
              if (user.emails.length > 0) {
                address = user.emails[0].address || "Unknown";
              }
              return {
                label: address,
                value: user._id
              };
            });

          return users;
        }
      }
    }
  });
};

export default assignManagerSchema;
