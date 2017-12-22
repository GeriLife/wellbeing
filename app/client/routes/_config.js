Router.configure({
  layoutTemplate: 'mainLayout'
});

/*
  Actions
*/

var requiresUserLogin = function () {
  if (!Meteor.user()) {
    this.render('login');
  } else {
    this.next();
  }
};

var anonymousRoutes = [
  'login',
  'atChangePwd',
  'atEnrollAccount',
  'atForgotPwd',
  'atResetPwd',
  'atSignIn',
  'atSignUp',
  'atVerifyEmail',
  'atresendVerificationEmail'
];

// User login required for all areas of site
Router.plugin('ensureSignedIn', {except: anonymousRoutes});
