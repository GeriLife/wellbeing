Template.usersSettingsTablePasswordActive.helpers({
  userPasswordActive () {
    // Get current user from template data context (reactively)
    const currentUser = Template.currentData();

    // Check if user password has been set (boolean)
    const userPasswordActive = ( currentUser.services && currentUser.services.password );

    return userPasswordActive;
  }
});
