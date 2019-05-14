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
    if (!user) return false
    if (!user.emails || (!!user.emails && user.emails.length === 0)) return false
    const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* Iterates through all emails and checks if all emails are valid */
    const areAllEmailsValid = user.emails.every(emailObject => {
      const emailAddress = emailObject.address;
      if (!emailAddress) return false
      return emailValidationRegex.test(emailAddress);
    })
    if (!areAllEmailsValid)
      // Must throw meteor error to show custom validation message
      throw new Meteor.Error(500, "Email address is not valid!");
    
    // return true in all other cases
    return true

  });
  Accounts.emailTemplates.from = process.env.FROM_EMAIL;
  
});
