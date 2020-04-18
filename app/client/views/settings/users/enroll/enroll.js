import usersEnrollSchema from './schema';
Template.usersEnroll.onCreated(function () {
  const templateInstance = this;
  templateInstance.groups = new ReactiveVar([]);

  Meteor.call('currentUserGroups', function (err, currentGroups) {
    if (!err) {
      templateInstance.groups.set(currentGroups);
    }
  });
});

Template.usersEnroll.helpers({
  buttonContent() {
    // Get localized text for send buttonContent
    return TAPi18n.__('usersEnroll-form-submitButton-text');
  },

  usersEnrollSchema() {
    return usersEnrollSchema(Template.instance().groups.get());
  }
});
