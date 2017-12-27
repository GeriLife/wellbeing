import usersEnrollSchema from './schema';

Template.usersEnroll.helpers({
  buttonContent () {
    // Get localized text for send buttonContent
    const buttonContent = TAPi18n.__('usersEnroll-form-submitButton-text');

    return buttonContent;
  },
  usersEnrollSchema () {
    return usersEnrollSchema;
  }
});
