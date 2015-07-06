Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('addActivity');
}, {
  name: 'front'
});

Router.route('/residents', function () {
  this.render('residents');
}, {
  name: 'residents'
});

Router.route('/graph', function () {
  this.render('graph');
}, {
  name: 'graph'
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
