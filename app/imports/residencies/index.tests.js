import { expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';

/* Importing collection to stub */
const Residencies = require('../../both/collections/residencies');
const Residents = require('../../both/collections/residents');
const Homes = require('../../both/collections/homes');

/* Import mock data variables */
import {
  invalidResidency,
  validResidency,
  home,
  resident,
  updateWithInvalidResidency,
  conflictingResidencyWithoutMoveOut,
  conflictingResidencyWithMoveOut,
} from './mockData.tests';
import { adminUser, nonAdminUser } from '../mockData.tests';

import { setupDbUsser, destroyDbUser, login } from '../utils.tests';
if (Meteor.isClient) {
  Meteor.subscribe('currentUserVisibleResidencies', true);
}

function _before(done, isAdmin) {
  /* Steps to do before executing tests */
  /* 1. stub Groups collection */
  StubCollections.stub([Residencies, Homes, Residents]);

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

const promisifyInsert = function(data) {
  return new Promise(function(resolve) {
    Residencies.insert(data, function(err, insertResp) {
      resolve(insertResp);
    });
  });
};

const insertHomeAndResident = function(homeObj, residentObj) {
  try {
    const homeInsId = Homes.insert(homeObj);
    const residentInsId = Residents.insert(residentObj);
    return {
      homeInsId,
      residentInsId,
    };
  } catch (e) {
    return {
      homeAndReserr: e.toString(),
    };
  }
};

const promisifyUpdate = function(insertData, updateData) {
  return new Promise(function(resolve, reject) {
    try {
      Meteor.call(
        'addAndUpdateResidency',
        {
          data: insertData,
          updateObj: updateData,
        },
        function(uperr, updateResp) {
          if (uperr) {
            reject(uperr);
          } else {
            resolve(updateResp);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

describe('Residency move out must be after move in', function() {
  let insertError, updateError, homeId, residentId;
  before(function(done) {
    _before(function() {
      const data = insertHomeAndResident(home, resident);
      if (data.homeAndReserr) {
        insertError = homeAndReserr;
      } else {
        homeId = data.homeInsId;
        residentId = data.residentInsId;
        invalidResidency.homeId = homeId;
        invalidResidency.residentId = residentId;
        validResidency.homeId = homeId;
        validResidency.residentId = residentId;
        updateWithInvalidResidency.$set.residentId = residentId;
        updateWithInvalidResidency.$set.residentId = residentId;
        Promise.all([
          promisifyInsert(invalidResidency),
          promisifyUpdate(validResidency, updateWithInvalidResidency),
        ])
          .then(responses => {
            insertError = responses[0];
            updateError = responses[1].error;
            // Residencies.remove(responses[1].insertId);
            done();
          })
          .catch(error => {
            done();
          });
      }
    }, true);
  });

  /* Tests */
  it('Insert callback should return false', function(done) {
    expect(insertError).to.exist;
    expect(insertError).to.equal(false);
    done();
  });

  it('Update callback should return error', function(done) {
    expect(updateError).to.exist;
    expect(updateError).to.equal(
      'Move out is not a valid date in residencies update [400]'
    );
    done();
  });

  after(function(done) {
    _after(function() {
      if (homeId) {
        Homes.remove(homeId);
      }
      if (residentId) {
        Residents.remove(residentId);
      }
      done();
    }, true);
  });
});

// describe('A new residency for a resident cannot be added during the period of another residency', function() {
//   let insertError, insertId1, insertId2;
//   before(function(done) {
//     _before(function() {
//       const data = insertHomeAndResident(home, resident);
//       if (data.homeAndReserr) {
//         insertError = homeAndReserr;
//         done()
//       } else {
//         conflictingResidencyWithMoveOut.homeId = data.homeInsId;
//         conflictingResidencyWithoutMoveOut.homeId = data.homeInsId;
//         conflictingResidencyWithMoveOut.residentId = data.residentInsId;
//         conflictingResidencyWithoutMoveOut.residentId = data.residentInsId;
        
//       Meteor.call(
//         'insertConsecutiveResidencies',
//         {
//           residency1: conflictingResidencyWithMoveOut,
//           residency2: conflictingResidencyWithoutMoveOut,
//         },
//         (errors, responses) => {
//           console.log('responses::', responses);
//           insertError = responses;
//           if (responses) {
//             insertId1 = responses.insertId1;
//             insertId2 = responses.insertId2;
//           }
//           done();
//         }
//       );
//       }
//     }, true);
//   });

//   /* Tests */
//   it('Should return error', function(done) {
//     expect(insertError).to.exist;
//     done()
//   });

//   after(function(done) {
//     _after(function() {
//       if (insertId1)
//         Residencies.remove(insertId1, function() {
//           if (insertId2) Residencies.remove(insertId2, done);
//         });
//     }, true);
//   });
// });
