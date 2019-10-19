import { expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';

/* Importing collection to stub */
import { GroupsCollection as Groups } from '../../both/collections/groups';

/* Import mock data variables */
import {
  newGroup,
  invalidGroupName,
  adminInsertGroup,
} from './mockData.tests';
import { adminUser, nonAdminUser } from '../mockData.tests';

import { setupDbUsser, destroyDbUser, login } from '../utils.tests';

function _before(done, isAdmin) {
  /* Steps to do before executing tests */
  /* 1. stub Groups collection */
  StubCollections.stub([Groups]);

  /* Login with a user */
  const user = isAdmin ? adminUser : nonAdminUser;
  if (!isAdmin) setupDbUsser(user, done);
  else login(user.email, user.password, done);
}

function _after(done, isAdmin) {
  StubCollections.restore();
  /* Login with a user */
  const { email } = isAdmin ? adminUser : nonAdminUser;
  if (!isAdmin) destroyDbUser(email, done);
  else Meteor.logout(done);
}

const promisifiedInsert = function() {
  return new Promise(function(resolve) {
    Groups.insert(adminInsertGroup, function(err) {
      resolve(err.reason);
    });
  });
};

const promisifiedUpdate = function() {
  return new Promise(function(resolve) {
    Groups.update(
      { _id: 'Group 1' },
      { $set: { name: 'g-1' } },
      function(err, resp) {
        resolve(resp);
      }
    );
  });
};
describe('Simple Group insert by admin user', function() {
  let insertRes;
  before(function(done) {
    _before(function() {
      Meteor.call('addGroup', newGroup, function(err, insertId) {
        insertRes = insertId;
        done();
      });
    }, true);
  });

  /* Tests */
  it('Allow any user role to add an activity', function(done) {
    expect(insertRes).to.exist;
    expect(/^[A-Za-z0-9]{17}$/.test(insertRes)).to.be.true;
    done();
  });
  after(function(done) {
    Meteor.call('removeGroup', insertRes);
    _after(done, true);
  });
});

describe('Group name under 30 chars', function() {
  let error;
  before(function(done) {
    _before(function() {
      Meteor.call('addGroup', invalidGroupName, function(err) {
        error = err.reason;
        done();
      });
    }, true);
  });

  /* Tests */
  it('Callback should return false', function(done) {
    expect(error).to.equal(
      'Name cannot exceed 30 characters in groups insert'
    );
    done();
  });
  after(function(done) {
    _after(done, true);
  });
});

describe('Do not allow non-admins to insert or update', function() {
  let insertOutput, updateOutput;
  before(function(done) {
    _before(function() {
      Promise.all([promisifiedInsert(), promisifiedUpdate()]).then(
        function(responses) {
          insertOutput = responses[0];
          updateOutput = responses[1];
          done();
        }
      );
    }, false);
  });

  /* Tests */
  it('Insert should throw error', async function(done) {
    expect(insertOutput).to.equal('Access denied');
    done();
  });

  it('Update should throw error', function(done) {
    expect(updateOutput).to.equal(0);
    done();
  });
  after(function(done) {
    _after(done, false);
  });
});
