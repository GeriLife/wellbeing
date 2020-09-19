import moment from 'moment';
const userEmailSchema = require('./userEmailSchema');

Meteor.startup(function () {
  Migrations.migrateTo('latest');
  const isDemo = process.env.GERILIFE_DEMO === 'true';

  if (Meteor.isServer && isDemo) {
    /* Remove any users, if exist */
    Meteor.users.remove({});

    /* Create mock data */
    Meteor.call(
      'createMockData',
      moment().subtract(365, 'days').toDate()
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

  Accounts.onCreateUser(function (options, user) {
    let { deactivateOn } = options;
    _.extend(user, {
      isActive: true,
      deactivateOn,
    });
    return user;
  });

  Accounts.validateNewUser(function (user) {
    const userEmailRecord = { emails: { ...user.emails } };
    try {
      userEmailSchema.validate(userEmailRecord);
      return true;
    } catch (e) {
      // Must throw meteor error to show custom validation message
      // Sending static error message for consistency with messages from previous validators
      throw new Meteor.Error(500, 'Email: Invalid email');
    }
  });

  /* Preventing login attempts by inactive users */
  Accounts.validateLoginAttempt(function (attempt) {
    if (!attempt.user) {
      throw new Meteor.Error(403, 'Login forbidden');
    }
    const { isActive } = attempt.user;

    /* If the user is inactive throw an error */
    if (isActive === false) {
      attempt.allowed = false;
      throw new Meteor.Error(403, 'User account is inactive.');
    }

    /* else return permission set by the login method */
    return attempt.allowed;
  });

  Accounts.emailTemplates.from = process.env.FROM_EMAIL;

  JsonRoutes.setResponseHeaders({
    'Cache-Control': 'no-store',
    Pragma: 'no-cache',
    'Access-Control-Allow-Origin': 'http://localhost:8080', // add more URLs per deployment
    'Access-Control-Allow-Headers':
      'origin, content-type, accept, authorization',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  });
});
