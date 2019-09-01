import { expect } from 'chai';
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
import { nonAdminUser } from '../mockData.tests';

import { setupDbUsser, destroyDbUser } from '../utils.tests';

function _before(done) {
  /* Steps to do before executing tests */
  /* 1. stub activities collection */
  StubCollections.stub([Activities]);

  /* Login with a user */
  setupDbUsser(nonAdminUser, done);
}

function _after(done) {
  StubCollections.restore();
  destroyDbUser(nonAdminUser.email, done);
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
  let updatedRowsNum;
  before(function(done) {
    _before(function() {
      Meteor.call('addActivity', mockInsertData, function(
        err,
        insertedDataId
      ) {
        try {
          updatedRowsNum = Activities.update(
            { _id: insertedDataId },
            { ...updateActivityObject }
          );
        } catch (e) {
        } finally {
          done();
        }
      });
    });
  });

  /* Tests */
  it('With non admin user it should throw error', function(done) {
    expect(updatedRowsNum).to.equal(0);

    done();
  });

  after(_after);
});

describe('Allow only admin to delete an activity', function() {
  let deletedResp;
  before(function(done) {
    _before(function() {
      Meteor.call('addActivity', mockInsertData, function(
        err,
        insertedDataId
      ) {
        try {
          deletedResp = Activities.remove(insertedDataId);
        } catch (e) {
        } finally {
          done();
        }
      });
    });
  });

  /* Tests */
  it('With non admin user it should throw error', function(done) {
    expect(deletedResp).to.equal(0);

    done();
  });

  after(_after);
});
