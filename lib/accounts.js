AccountsTemplates.configure({
  // Behavior
  enablePasswordChange: true,
  showForgotPasswordLink: true
});

// Configure AccountsTemplates routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
