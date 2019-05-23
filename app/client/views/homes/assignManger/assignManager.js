import assignManagerSchema from "./schema";

Template.assignManager.onCreated(function() {
  const templateInstance = this;
  templateInstance.subscribe("allUsers");
  templateInstance.currentManagers = new ReactiveVar(null);
  Meteor.call("getCurrentManagers", templateInstance.data.groupId, function(
    err,
    userEmails
  ) {
    if (!err && userEmails && userEmails.length > 0) {
      templateInstance.currentManagers.set(userEmails);
    }
  });
});

Template.assignManager.helpers({
  assignManagerSchema() {
    return assignManagerSchema(Template.instance().data.groupId);
  },
  buttonContent() {
    return TAPi18n.__("assignManager-form-submitButton-text");
  },
  currentManagers() {
    const currentManagers = Template.instance().currentManagers.get();
    if (!currentManagers) return currentManagers;
    return currentManagers.join(", ")
  }
});
