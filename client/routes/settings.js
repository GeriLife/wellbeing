/*
  Settings routes
*/

Router.route('/settings', function () {
  this.layout('settingsLayout');
  this.render('settings');
}, {
  name: 'settings',
});

Router.route('/settings/datetime', function () {
  this.layout('settingsLayout');
  this.render('dateTimeSettings');
}, {
  name: 'dateTimeSettings',
});
