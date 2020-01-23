import moment from 'moment';

Meteor.startup(function() {
  Migrations.migrateTo('latest');

  const mongoUrl = process.env.MONGO_URL;

  if (
    Meteor.isServer &&
    mongoUrl.includes('27019') &&
    mongoUrl.includes('wellbeing-demo')
  ) {
    /* Remove any users, if exist */
    Meteor.users.remove({});

    /* Create mock data */
    Meteor.call(
      'createMockData',
      moment()
        .subtract(365, 'days')
        .toDate()
    );

    /* Create 2 users. One admin and a normal user */
    const adminUser = Accounts.createUser({
      username: 'Admin user',
      email: 'admin@email.com',
      password: '1234',
    });
    Roles.addUsersToRoles(adminUser, 'admin');

    Accounts.createUser({
      username: 'User',
      email: 'user@email.com',
      password: '1234',
    });
  }
});
