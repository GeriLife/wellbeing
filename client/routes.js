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

Router.route('/resident/:residentId', function () {
  this.render('resident');
}, {
  name: 'resident'
});

Router.route('/groups', function () {
  this.render('groups');
}, {
  name: 'groups'
});

Router.route('/group/:groupId', function () {
  var controller = this;
  var groupId = controller.params.groupId;
  this.render('group', {
    data:function(){
      return Groups.findOne(groupId);
    }
  });
}, {
  name: 'group'
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
