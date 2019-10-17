import { expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';

/* Importing collection to stub */
const Residents = require('../../both/collections/residents');
const Residencies = require('../../both/collections/residencies');
const Groups = require('../../both/collections/groups');
const Permissions = require('../../both/collections/permissions');

/* Import mock data variables */
import { baseGroupObject, validResident } from './mockData.tests';
import { adminUser, nonAdminUser } from '../mockData.tests';

import {
  setupDbUsser,
  destroyDbUser,
  login,
  createManager,
} from '../utils.tests';

/* To create appropriate user for the test */
function loginAndInsert(email, password, resident, cb) {
  login(email, password, function() {
    Residents.insert(resident, cb);
  });
}
function createManagerAndLogin(cb) {
  login(adminUser.email, adminUser.password, function(errLogin) {
    const groupId = Groups.insert(baseGroupObject);
    createManager(groupId, nonAdminUser, function(err) {
      Meteor.logout(function(logouterr) {
        if (!logouterr && !err) {
          login(nonAdminUser.email, nonAdminUser.password, cb);
        } else {
          cb(err || logouterr);
        }
      });
    });
  });
}

/* Crud operations */

function remove(cb) {
  Residents.insert(validResident, function(err, insertId) {
    if (err) {
      cb(err);
    } else {
      Residents.remove(insertId, function(err, data) {
        if (err) {
          cb({ err, insertId });
        } else {
          cb(null, { data, insertId });
        }
      });
    }
  });
}

function afterForNonAdmin(insertId, done) {
  if (insertId) {
    Residents.remove(insertId);
  }
  destroyDbUser(nonAdminUser.email, function() {
    StubCollections.restore();
    done();
  });
}

function afterForAdminUser(insertId, done) {
  if (insertId) {
    Residents.remove(insertId);
  }
  Meteor.logout();
  StubCollections.restore();
  done();
}

function allowedActionToassert(action, done) {
  expect(action).to.exist;
  expect(action).to.equal(1);
  done();
}

function disallowedActionToassert(action, done) {
  expect(action).to.exist;
  expect(action).to.equal(0);
  done();
}
describe('A manager can add and update but not remove', function() {
  let insertId, update, removeErr;
  before(function(done) {
    StubCollections.stub([
      Residencies,
      Groups,
      Residents,
      Permissions,
    ]);

    createManagerAndLogin(function(err) {
      if (!err) {
        insertId = Residents.insert(validResident);
        update = Residents.update(
          { _id: insertId },
          { $set: { firstName: 'qwerty' } }
        );
        Residents.remove(insertId, function(removeErrinResp, resp) {
          removeErr = resp;

          done();
        });
      } else {
        done();
      }
    });
  });

  after(function(done) {
    destroyDbUser(nonAdminUser.email, function() {
      StubCollections.restore();
      done();
    });
  });
  it('insertid should be a valid mongo id', function(done) {
    expect(/^[A-Za-z0-9]{17}$/.test(insertId)).to.be.true;
    done();
  });
  it('update to equal to 1', function(done) {
    expect(update).to.equal(1);
    done();
  });
  it('Remove should fail', function(done) {
    expect(removeErr).to.equal(0);
    done();
  });
});

describe('When admin inserts a resident', function() {
  let insertId;
  before(function(cb) {
    StubCollections.stub([Residencies, Groups, Residents]);
    loginAndInsert(
      adminUser.email,
      adminUser.password,
      validResident,
      function(err, id) {
        insertId = id;
        cb();
      }
    );
  });

  it('Row must be inserted', function(done) {
    expect(insertId).to.exist;
    expect(/^[A-Za-z0-9]{17}$/.test(insertId)).to.be.true;
    done();
  });
  after(function(done) {
    afterForAdminUser(insertId, done);
  });
});

describe('When admin updates a resident', function() {
  let updateNoOfRows, insertId;
  before(function(cb) {
    StubCollections.stub([Residencies, Groups, Residents]);
    login(adminUser.email, adminUser.password, function() {
      Meteor.call('insertAndUpdateResident', validResident, function(
        err,
        res
      ) {
        if (res.error) {
          insertId = err.insertId;
        } else {
          updateNoOfRows = res.data;
          insertId = res.insertId;
        }
        cb();
      });
    });
  });

  it('Update should be allowed', function(done) {
    allowedActionToassert(updateNoOfRows, done);
  });
  after(function(done) {
    afterForAdminUser(insertId, done);
  });
});

describe('When admin remove a resident', function() {
  let deleteNoOfRows;
  before(function(cb) {
    StubCollections.stub([Residencies, Groups, Residents]);
    login(adminUser.email, adminUser.password, function() {
      remove(function(err, res) {
        deleteNoOfRows = res.data;
        cb();
      });
    });
  });

  after(function(done) {
    Meteor.logout();
    StubCollections.restore();
    done();
  });

  it('Removal should be allowed', function(done) {
    allowedActionToassert(deleteNoOfRows, done);
  });
});

describe('When non-admin inserts a resident', function() {
  let insertId;
  before(function(done) {
    StubCollections.stub([Residencies, Groups, Residents]);
    setupDbUsser(nonAdminUser, function(er, userId) {
      Residents.insert(validResident, function(err, id) {
        insertId = id;
        done();
      });
    });
  });

  it('Insert ID must not be generated', function(done) {
    expect(insertId).to.equal(undefined);
    done();
  });
  after(function(done) {
    afterForNonAdmin(insertId, done);
  });
});

describe('When non-admin updates a resident', function() {
  let updateNoOfRows, insertId;
  before(function(cb) {
    StubCollections.stub([Residencies, Groups, Residents]);
    login(adminUser.email, adminUser.password, function() {
      insertId = Residents.insert(validResident);

      Meteor.logout();

      setupDbUsser(nonAdminUser, function() {
        updateNoOfRows = Residents.update(
          { _id: insertId },
          { $set: { firstName: 'new name' } }
        );

        cb();
      });
    });
  });

  it('Should not allow update', function(done) {
    disallowedActionToassert(updateNoOfRows, done);
  });
  after(function(done) {
    afterForNonAdmin(insertId, done);
  });
});

describe('When non-admin remove a resident', function() {
  let deleteNoOfRows;
  let insertId;
  before(function(cb) {
    StubCollections.stub([Residencies, Groups, Residents]);
    login(adminUser.email, adminUser.password, function() {
      insertId = Residents.insert(validResident);
      Meteor.logout();

      setupDbUsser(nonAdminUser, function() {
        try {
          deleteNoOfRows = Residents.remove(insertId);
        } catch (e) {
          console.log(e);
        }
        cb();
      });
    });
  });

  after(function(done) {
    destroyDbUser(nonAdminUser.email, function() {
      StubCollections.restore();
      done();
    });
  });

  it('Should not be allowed', function(done) {
    disallowedActionToassert(deleteNoOfRows, done);
  });
});
