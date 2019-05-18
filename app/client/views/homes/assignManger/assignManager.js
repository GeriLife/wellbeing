import assignManagerSchema from "./schema";

Template.assignManager.onCreated(function() {
  const templateInstance = this;
  templateInstance.subscribe("allUsers");
  templateInstance.currentManager = new ReactiveVar(null);
  Meteor.call("getCurrentManager", templateInstance.data.groupId, function(
    err,
    userEmail
  ) {
    if (err) return;
    else {
      templateInstance.currentManager.set(userEmail);
    }
  });
});

Template.assignManager.helpers({
  assignManagerSchema() {
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
    return assignManagerSchema(users, Template.instance().data.groupId);
  },
  buttonContent() {
    return TAPi18n.__("assignManager-form-submitButton-text");
  },
  currentAssignUser() {
    return Template.instance().currentManager.get();
  }
});
