Meteor.startup(function() {
  Migrations.migrateTo('latest');
  SyncedCron.start();
});
