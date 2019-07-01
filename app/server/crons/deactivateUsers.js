import { CronJob } from 'cron';

new CronJob(
  '0 0 12 * * *',
  Meteor.bindEnvironment(function(err, data) {
    /* Get all users for whom the deactivation date is set */
    Meteor.users.update(
      {
        $and: [
          { deactivateOn: { $lte: new Date() } },
          { deactivateOn: { $exists: true } },
        ],
      },
      {
        $set: { isActive: false },
      },
      {
        multi: true,
      }
    );
  }),
  null,
  true
);
