import { expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';

/* Importing collection to stub */
const Residents = require('../../both/collections/residents');
const Residencies = require('../../both/collections/residencies');
const Groups = require('../../both/collections/groups');

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
  const groupId = Groups.insert(baseGroupObject);
  createManager(groupId, nonAdminUser, cb);
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

describe('When admin inserts a resident', function() {
  let insertId;
  before(function(cb) {
    StubCollections.stub([Residencies, Groups, Residents]);
    loginAndInsert(
      adminUser.email,
      adminUser.password,
      validResident,
      function(err, id) {
        // Residents.insert(validResident, function(err, id) {
        insertId = id;
        cb();
        // });
      }
    );
  });

  it('Should be allowed', function(done) {
    expect(insertId).to.exist;
    expect(/^[A-Za-z0-9]{17}$/.test(insertId)).to.be.true;
    done();
  });
  after(function(done) {
    if (insertId) {
      Residents.remove(insertId);
    }
    Meteor.logout();
    StubCollections.restore();
    done();
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

  it('Should be allowed', function(done) {
    expect(updateNoOfRows).to.exist;
    expect(updateNoOfRows).to.equal(1);
    done();
  });
  after(function(done) {
    if (insertId) {
      Residents.remove(insertId);
    }
    Meteor.logout();
    StubCollections.restore();
    done();
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

  it('Should be allowed', function(done) {
    expect(deleteNoOfRows).to.exist;
    expect(deleteNoOfRows).to.equal(1);
    done();
  });
});

// describe('Crud operations by non-admin users should fail');

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

  it('Should not be allowed', function(done) {
    expect(insertId).to.equal(undefined);
    done();
  });
  after(function(done) {
    if (insertId) {
      Residents.remove(insertId);
    }
    destroyDbUser(nonAdminUser.email, function() {
      StubCollections.restore();
      done();
    });
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

  it('Should not be allowed', function(done) {
    expect(updateNoOfRows).to.exist;
    expect(updateNoOfRows).to.equal(0);
    done();
  });
  after(function(done) {
    if (insertId) {
      Residents.remove(insertId);
    }
    destroyDbUser(nonAdminUser.email, function() {
      StubCollections.restore();
      done();
    });
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
    expect(deleteNoOfRows).to.exist;
    expect(deleteNoOfRows).to.equal(0);
    done();
  });
});

// // describe('A set of crud operations for managers must be permitted');
