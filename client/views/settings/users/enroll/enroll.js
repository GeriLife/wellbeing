import usersEnrollSchema from './schema';

Template.usersEnroll.helpers({
  buttonContent () {
    // Get localized text for send buttonContent
    const buttonContent = TAPi18n.__('usersEnroll_form_submitButton_text');

    return buttonContent;
  },
  usersEnrollSchema () {
    return usersEnrollSchema;
  }
});
