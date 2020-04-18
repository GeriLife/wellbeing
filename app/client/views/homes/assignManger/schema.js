import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(["autoform"]);

AutoForm.addInputType("managerSelectFormTemplate", {
  template: "managerSelectFormTemplate",
  valueIsArray: true,
  valueOut() {
    return this.val();
  }
});
const assignManagerSchema = function(groupId, managerList) {
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
    users: {
      type: Array,
      optional: false,
      autoform: {
        type: "managerSelectFormTemplate",
        options: () => managerList
      }
    },
    "users.$": {
      type: String
    }
  });
};

export default assignManagerSchema;

