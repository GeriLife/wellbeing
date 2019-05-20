import assignManagerSchema from "./schema";

Template.assignManager.onCreated(function() {
  const templateInstance = this;
  templateInstance.subscribe("allUsers");
});

Template.assignManager.helpers({
  assignManagerSchema() {
    return assignManagerSchema(Template.instance().data.groupId);
  },
  buttonContent() {
    return TAPi18n.__("assignManager-form-submitButton-text");
  }
});
