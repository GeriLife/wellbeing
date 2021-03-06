export const destroyDbUser = function(email, cb) {
  Meteor.call('removeUser', email, cb);
};

export const login = function(email, password, cb) {
  Meteor.loginWithPassword(email, password, cb);
};

export const createTestUser = function(user, cb) {
  Meteor.call('createTestUser', user, cb);
};

export const setupDbUsser = function(user, cb) {
  createTestUser(user, function(err, userInfo) {
    if (err) {
      cb(err, userInfo);
    } else {
      login(user.email, user.password, cb);
    }
  });
};

export const createManager = function(groupId, user, cb) {
  createTestUser(user, function(err, insertedUser) {
    if (err) {
      return cb(err);
    }
    let userId = insertedUser;
    if (typeof insertedUser !== 'string') {
      userId = insertedUser._id;
    }
    Meteor.call('assignManager', { groupId, users: [userId] }, cb);
  });
};
