import { expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';

/* Importing collection to stub */
import { GroupsCollection as Groups } from '../../both/collections/groups';

/* Import mock data variables */
import {
  newGroup,
  invalidGroupName,
  adminInsertGroup,
} from './mockData.spec';
import { adminUser, nonAdminUser } from '../mockData.spec';

import { setupDbUsser, destroyDbUser, login } from '../utils.spec';

function _before(done, isAdmin) {
  /* Steps to do before executing tests */
  /* 1. stub Groups collection */
  StubCollections.stub([Groups]);
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

if (Meteor.isClient) {
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
        Meteor.call('addGroup', invalidGroupName, function(err, res) {
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

  // describe('Do not allow non-admins to insert or update', function() {
  //   before(function(done) {
  //     _before(done, false);
  //   });

  //   /* Tests */
  //   it('Insert should throw error', function(done) {
  //     Groups.insert(adminInsertGroup, function(err, res) {
  //       expect(err).to.exist;
  //       expect(err.resson).to.equal('Access denied');
  //       done();
  //     });
  //   });

  //   it('Update should throw error', function(done) {
  //     Groups.update(
  //       { _id: 'Group 1' },
  //       { $set: { name: 'g-1' } },
  //       function(err, resp) {
  //         expect(resp).to.eq(0);
  //         done();
  //       }
  //     );
  //   });
  //   after(function(done) {
  //     _after(done, false);
  //   });
  // });
}
