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

// User login required for all areas of site
Router.onBeforeAction(requiresUserLogin, {except: ['login']});
