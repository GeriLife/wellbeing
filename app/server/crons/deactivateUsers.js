SyncedCron.add({
  name: 'Deactivate user',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 1 day at 12:00 am');
  },
  job: function() {
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
  },
});
