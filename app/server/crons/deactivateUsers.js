import { CronJob } from 'cron';

new CronJob(
  '0 0 12 * * *',
  Meteor.bindEnvironment(function(err, data) {
    /* Get all users for whom the deactivation date is set */
    const users = Meteor.users
      .find({
        $and: [
          { deactivateOn: { $lte: new Date() } },
          { deactivateOn: { $gt: new Date(0) } },
        ],
      })
      .fetch();

    /* For all retrieved users */
    _.each(users, function(user) {
      /* Make the user Inactive */
      Meteor.users.update(user, {
        $set: { isActive: false },
      });
    });
  }),
  null,
  true
);
