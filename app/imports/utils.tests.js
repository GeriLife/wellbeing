export const destroyDbUser = function(email, cb) {
  Meteor.call('removeUser', email, cb);
};

export const login = function(email, password, cb) {
  Meteor.loginWithPassword(email, password, function(
    loginErr,
    loginSuccess
  ) {
    cb(loginErr, loginSuccess);
  });
};

export const createTestUser = function(user, cb) {
  Meteor.call('createTestUser', user, cb);
};

export const setupNonAdminDbUsser = function(user, cb) {
  createTestUser(user, function(err, userInfo) {
    if (err) {
      cb(err, userInfo);
    } else {
      login(user.email, user.password, cb);
    }
  });
};
