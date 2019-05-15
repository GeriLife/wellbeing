const userEmailSchema = require("./userEmailSchema");
AccountsTemplates.configure({
  // Behavior
  forbidClientAccountCreation: true,
  enablePasswordChange: true,
  showForgotPasswordLink: true
});

Accounts.config({
  passwordEnrollTokenExpirationInDays: 60
});

// Configure AccountsTemplates routes
AccountsTemplates.configureRoute("changePwd");
AccountsTemplates.configureRoute("enrollAccount");
AccountsTemplates.configureRoute("forgotPwd");
AccountsTemplates.configureRoute("resetPwd");
AccountsTemplates.configureRoute("signIn");

Meteor.startup(function () {
  Accounts.validateNewUser(function (user) {
    const userEmailRecord = { emails: { ...user.emails } };
    try {
      userEmailSchema.validate(userEmailRecord);
      return true
    } catch (e) {
      // Must throw meteor error to show custom validation message
      // Sending static error message for consistency with messages from previous validators
      throw new Meteor.Error(500, "Email: Invalid email");
    }
  });
  Accounts.emailTemplates.from = process.env.FROM_EMAIL;
  
});
