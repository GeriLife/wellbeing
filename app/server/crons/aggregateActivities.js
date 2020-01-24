import { CronJob } from 'cron';

new CronJob(
  '0 0 12 * * *',
  Meteor.bindEnvironment(function() {
    Meteor.call('aggregateActivitiesAndPopulateAggregateCollection');
  }),
  null,
  true
);
