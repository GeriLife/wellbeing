/*
  Settings routes
*/

Router.route('/settings', function () {
  this.layout('settingsLayout');
  this.render('settings');
}, {
  name: 'settings',
});

/*
Date/time
*/
Router.route('/settings/datetime', function () {
  this.layout('settingsLayout');
  this.render('dateTimeSettings');
}, {
  name: 'dateTimeSettings',
});

/*
Activity Types
*/
Router.route('/settings/activity-types', function () {
  this.layout('settingsLayout');
  this.render('activityTypesSettings');
}, {
  name: 'activityTypesSettings'
});
