Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('addActivity');
}, {
  name: 'front'
});

var requiresUserLogin = function () {
    if (!Meteor.user()) {
        this.render('login');
    } else {
        this.next();
    }
};

// User login required for event registration
Router.onBeforeAction(requiresUserLogin, {only: ['front']});
