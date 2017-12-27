/*
  Groups routes
*/

Router.route('/groups', function () {
  this.render('groups');
}, {
  name: 'groups'
});

Router.route('/groups/add', function () {
  this.render('addGroup');
}, {
  name: 'addGroup'
});

Router.route('/group/:groupId', function () {
  var controller = this;
  var groupId = controller.params.groupId;
  this.render('group', {
    data: function() {
      return Groups.findOne(groupId);
    }
  });
}, {
  name: 'group'
});
