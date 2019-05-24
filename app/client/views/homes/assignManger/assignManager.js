import assignManagerSchema from "./schema";

Template.assignManager.onCreated(function() {
  const templateInstance = this;
  const groupId = templateInstance.data.groupId;
  templateInstance.subscribe("allUsers");
  templateInstance.currentManagers = new ReactiveVar(null);

  Meteor.call("getCurrentManagers", groupId, function(err, userEmails) {
    const hasUserEmails = userEmails && userEmails.length > 0;

    if (!err && hasUserEmails) {
      templateInstance.currentManagers.set(userEmails);
    }
  });
});

Template.assignManager.helpers({

  assignManagerSchema() {
    const groupId = Template.instance().data.groupId;
    return assignManagerSchema(groupId);
  },

  buttonContent() {
    return TAPi18n.__("assignManager-form-submitButton-text");
  },

  currentManagers() {
    const currentManagers = Template.instance().currentManagers.get();
    
    if (!currentManagers) return currentManagers;
    return currentManagers.join(", ");
  }
});
