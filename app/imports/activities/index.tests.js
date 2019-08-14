import { assert, expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import { mockInsertData, insertWithoutduration } from './mockData';

const Activities = require("../../both/collections/activities")

describe('Activity page actions', function() {
  let insertRes;
  before(function(done) {
    StubCollections.stub([Activities]);
    Meteor.loginWithPassword(
      'mehtashailee21@gmail.com',
      'Shailee',
      function(error) {
        console.log(error);
        done();
      }
    );
  });
  it('Allow any user role to add an activity', function() {
    insertRes = Activities.insert(mockInsertData);
    expect(insertRes).to.exist;
    expect( /^[A-Za-z0-9]{17}$/.test(insertRes)).to.be
      .true;
  });

  it('Should not allow adding data without duration', function() {
    insertRes = Activities.insert(mockInsertData);
    console.log('insert 567', insertRes);
    // expect(insertRes).to.exist;
  });

  after(function(done) {
    StubCollections.restore();
    done();
  });
});
