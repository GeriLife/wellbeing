/*
  Homes routes
*/
Router.route('/homes', function () {
  this.render('homes');
}, {
  name: 'homes'
});

Router.route('/home/:homeId', function () {
  this.render('home');
}, {
  name: 'home'
});

Router.route('/home/:homeId/report', function () {
  this.render('homeReport');
}, {
  name: 'homeReport'
});

Router.route('/latest-activities', function () {
  this.render('latestActivitiesByType');
}, {
  name: 'latestActivitiesByType'
});
