/*
  Settings routes
*/

Router.route('/settings', function () {
  this.layout('settingsLayout');
  this.render('settings');
}, {
  name: 'settings',
});
