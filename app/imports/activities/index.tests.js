import { expect, assert } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import moment from 'moment';

/* Importing collection to stub */
const Activities = require('../../both/collections/activities');

/* Import mock data variables */
import {
  mockInsertData,
  insertWithInvalidActivityDate,
  updateActivityObject,
} from './mockData.tests';
import { nonAdminUser, adminUser } from '../mockData.tests';

/* Add an admin user as the first user is alway admin */
Meteor.startup(function() {
  Meteor.call('createTestUser', adminUser, function(err, success) {
    console.log(err, success, 'admin (*&^*&^%$');
  });
});

function setupNonAdminDbUsser(cb) {
  Meteor.call('createTestUser', nonAdminUser, function(
    err,
    userInfo
  ) {
    Meteor.loginWithPassword(
      nonAdminUser.email,
      nonAdminUser.password,
      function(loginErr) {
        cb();
      }
    );
  });
}

async function destroyDbUser(email, cb) {
  Meteor.call('removeUser', email, cb);
}

function _before(done) {
  /* Steps to do before executing tests */
  /* 1. stub activities collection */
  StubCollections.stub([Activities]);

  /* Login with a user */
  setupNonAdminDbUsser(done);
}

function _after(done) {
  StubCollections.restore();
  destroyDbUser(nonAdminUser.email, done);
  destroyDbUser(adminUser.email, done);
}

describe('Activity simple insert action', function() {
  let insertRes;
  let insertedUserID;
  before(_before);

  /* Tests */
  it('Allow any user role to add an activity', function(done) {
    insertRes = Activities.insert(mockInsertData);
    expect(insertRes).to.exist;
    expect(/^[A-Za-z0-9]{17}$/.test(insertRes)).to.be.true;
    done();
  });
  after(_after);
});

describe('Check that dates must we within seven days from current date', function() {
  let insertError;
  before(function(done) {
    _before(function() {
      Meteor.call(
        'addActivity',
        insertWithInvalidActivityDate,
        function(err, success) {
          insertError = err.reason;
          done();
        }
      );
    });
  });

  /* Tests */
  it('Should not allow adding data without duration', function(done) {
    expect(insertError).to.equal(
      'Activity date must be on or after ' +
        moment()
          .endOf('day')
          .subtract(7, 'days')
          .format('YYYY-MM-DD') +
        ' in activities insert'
    );

    done();
  });

  after(_after);
});

describe('Allow only admin to update date', function() {
  let insertError;
  before(function(done) {
    _before(function() {
      Meteor.call('addActivity', mockInsertData, function(
        err,
        insertedDataId
      ) {
        Meteor.call(
          'updateActivity',
          { id: insertedDataId, dataModifier: updateActivityObject },
          function(err, success) {
            console.log('tltltl', err, success);
            insertError = err;
            done();
          }
        );
      });
    });
  });

  /* Tests */
  it('With non admin user it should throw error', function(done) {
    expect(insertError).to.equal('Kuchh bhi');

    done();
  });

  after(_after);
});
