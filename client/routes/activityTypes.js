/*
Activity Type related routes
*/
Router.route('/activities/types', function () {
  this.render('activityTypesList');
}, {
  name: 'activityTypesList'
});
