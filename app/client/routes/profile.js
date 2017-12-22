/*
  Profile routes
*/

Router.route('/profile', function () {
  this.render('userProfile');
}, {
  name: 'userProfile',
});
