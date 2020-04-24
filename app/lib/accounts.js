AccountsTemplates.configure({
  // Behavior
  forbidClientAccountCreation: true,
  enablePasswordChange: true,
  showForgotPasswordLink: true,
});

Accounts.config({
  passwordEnrollTokenExpirationInDays: 60,
});

// Configure AccountsTemplates routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
