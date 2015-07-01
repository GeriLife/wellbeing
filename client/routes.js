Router.route('/', function () {
  this.render('main');
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
