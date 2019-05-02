import usersEnrollSchema from './schema';
Template.usersEnroll.onCreated(function() {
  const templateInstance = this;
  templateInstance.subscribe("allGroups");
});
Template.usersEnroll.helpers({
  buttonContent () {
    // Get localized text for send buttonContent
    const buttonContent = TAPi18n.__('usersEnroll-form-submitButton-text');

    return buttonContent;
  },
  usersEnrollSchema () {
    const allGroups = Groups.find().fetch();
    console.log(allGroups)

   return  usersEnrollSchema(allGroups);
   
  }
});
