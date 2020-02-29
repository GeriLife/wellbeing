const userEmailSchema = require('./userEmailSchema');
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

Meteor.startup(function() {
  Accounts.onCreateUser(function(options, user) {
    let { deactivateOn } = options;
    _.extend(user, {
      isActive: true,
      deactivateOn
    });
    return user;
  });

  Accounts.validateNewUser(function(user) {
    const userEmailRecord = { emails: { ...user.emails } };
    try {
      userEmailSchema.validate(userEmailRecord);
      return true;
    } catch (e) {
      // Must throw meteor error to show custom validation message
      // Sending static error message for consistency with messages from previous validators
      throw new Meteor.Error(500, TAPi18n.__('invalidEmail'));
    }
  });

  /* Preventing login attempts by inactive users */
  Accounts.validateLoginAttempt(function(attempt) {
    var { isActive } = attempt.user;

    /* If the user is inactive throw an error */
    if (isActive === false) {
      attempt.allowed = false;
      throw new Meteor.Error(403, TAPi18n.__('userInactive'));
    }

    /* else return permission set by the login method */
    return attempt.allowed;
  });

  Accounts.emailTemplates.from = process.env.FROM_EMAIL;
});
