Template.usersSettingsTablePasswordActive.helpers({
  userPasswordIsSet () {
    // Get current user from template data context (reactively)
    const currentUser = Template.currentData();
    console.log(currentUser);

    // Check if user password has been set (boolean)
    const userPasswordActive = ( currentUser.services && currentUser.services.password );

    return userPasswordActive;
  }
});
