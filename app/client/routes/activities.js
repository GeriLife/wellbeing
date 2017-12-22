/*
  Activities routes
*/

Router.route('/activities', function () {
  this.render('activities');
}, {
  name: 'activities'
});

Router.route('/activities/new', function () {
  this.render('newActivity');
}, {
  name: 'newActivity'
});
