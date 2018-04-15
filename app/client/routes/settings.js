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
Activity Types
*/
Router.route('/settings/activity-types', function () {
  this.layout('settingsLayout');
  this.render('activityTypesSettings');
}, {
  name: 'activityTypesSettings'
});

/*
Data
*/
Router.route('/settings/data', function () {
  this.layout('settingsLayout');
  this.render('dataSettings');
}, {
  name: 'dataSettings'
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
Roles
*/
Router.route('/settings/roles', function () {
  this.layout('settingsLayout');
  this.render('rolesSettings');
}, {
  name: 'rolesSettings'
});

/*
User event log
*/
Router.route('/settings/event-log', function () {
  this.layout('settingsLayout');
  this.render('userEventLog');
}, {
  name: 'userEventLog'
});

/*
Users
*/
Router.route('/settings/users', function () {
  this.layout('settingsLayout');
  this.render('usersSettings');
}, {
  name: 'usersSettings'
});
