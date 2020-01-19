import { expect } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import {
  activitesCollection,
  residencyData,
  residentsData,
  activitiesForTestingActivityLevelConditions,
  residentsScenario1,
  residentsScenario2,
  residentsScenario3,
} from './mockData.tests';

/* Importing collection to stub */
import { ActivitiesCollection as Activities } from '../../both/collections/activities';
import { ResidenciesCollection as Residencies } from '../../both/collections/residencies';
import { ResidentsCollection as Residents } from '../../both/collections/residents';

if (Meteor.isServer) {
  describe('/homes - Activity levels charts', function() {
    beforeEach(function(done) {
      /* Stub */
      resetDatabase();
      StubCollections.stub(Activities);
      StubCollections.stub(Residencies);
      StubCollections.stub(Residents);

      /* Prepare Data */
      Meteor.call(
        'prepareActivityData',
        {
          roles: [],
          activityTypes: [],
          activitesCollection,
          aggregateData: [],
          residencyData,
          residentsData: [
            ...residentsData,
            ...residentsScenario1,
            ...residentsScenario2,
            ...residentsScenario3,
          ],
        },
        done
      );
    });

    afterEach(function() {
      /* Restore stubs */
      StubCollections.restore(Activities);
      StubCollections.restore(Residencies);
      StubCollections.restore(Residents);
      resetDatabase();
    });

    describe('checkIfResidentWasActiveOnDate', function() {
      it('Should return error if date is not provided', function(done) {
        Meteor.call('checkIfResidentWasActiveOnDate', '222', function(
          err,
          res
        ) {
          expect(err.message).to.be.eq('[Date is mandatory]');
          done();
        });
      });

      it('Should return false if not active', function(done) {
        Meteor.call(
          'checkIfResidentWasActiveOnDate',
          '222',
          new Date(),
          function(err, res) {
            expect(res).to.be.eq(false);
            done();
          }
        );
      });

      it('Should return activity count if user was active', function(done) {
        Meteor.call(
          'checkIfResidentWasActiveOnDate',
          '2',
          '2020-01-03 12:00:00',
          function(err, res) {
            expect(res).to.be.eq(true);
            done();
          }
        );
      });
    });

    describe('getResidentRecentActiveDays', function() {
      it('Should select 6 days upto the given date', function(done) {
        Meteor.call(
          'getResidentRecentActiveDays',
          '2',
          '2020-01-06 00:00:00',
          function(err, result) {
            const expected = [
              false,
              true,
              false,
              true,
              false,
              false,
              false,
            ];
            expect(
              result.map(r => r.residentWasActive)
            ).to.have.members(expected);
            done();
          }
        );
      });

      it('Should select 6 days upto the current date if not date is passed', function(done) {
        Meteor.call(
          'getResidentRecentActiveDays',
          '2',

          function(err, result) {
            const expected = [
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ];
            expect(
              result.map(r => r.residentWasActive)
            ).to.have.members(expected);
            done();
          }
        );
      });
    });

    describe('getResidentRecentActiveDaysCount', function() {
      it('Should select 6 days upto the given date and return count of active days', function(done) {
        Meteor.call(
          'getResidentRecentActiveDaysCount',
          '2',
          '2020-01-06 00:00:00',
          function(err, result) {
            expect(result).to.eq(2);
            done();
          }
        );
      });

      it('Should return activity count of 6 days upto the current date if not date is passed', function(done) {
        Meteor.call(
          'getResidentRecentActiveDaysCount',
          '2',

          function(err, result) {
            expect(result).to.eq(0);
            done();
          }
        );
      });
    });

    describe('getHomeCurrentResidencies', function() {
      it('Should return all active resident its for a given home', function(done) {
        Meteor.call('getHomeCurrentResidencies', '1', function(
          err,
          result
        ) {
          const resultWithDate = result[0];
          resultWithDate.moveIn = new Date(
            resultWithDate.moveIn
          ).getTime();

          expect(resultWithDate).to.contains({
            residentId: 'BmJdgv6vZQ42MGerG',
            homeId: '1',
            moveIn: new Date('2020-01-09T00:00:00.000Z').getTime(),
          });

          done();
        });
      });
    });

    describe('getHomeCurrentResidentIds', function() {
      it('Should return all active resident its for a given home', function(done) {
        Meteor.call('getHomeCurrentResidentIds', '1', function(
          err,
          result
        ) {
          expect(result.length).to.eq(1);
          expect(result[0]).to.contains('BmJdgv6vZQ42MGerG');
          done();
        });
      });
    });

    describe('getHomeCurrentAndActiveResidentIds', function() {
      it('Should return all active resident ids for a given home', function(done) {
        Meteor.call(
          'getHomeCurrentAndActiveResidentIds',
          '1',
          function(err, result) {
            expect(result.length).to.eq(1);
            expect(result[0]).to.contains('BmJdgv6vZQ42MGerG');
            done();
          }
        );
      });
    });

    describe('getHomeCurrentAndActiveResidentCount', function() {
      it('Should return count of all active residents for a given home', function(done) {
        Meteor.call(
          'getHomeCurrentAndActiveResidentCount',
          '1',
          function(err, result) {
            expect(result).to.eq(1);
            done();
          }
        );
      });
    });

    describe('aggregation tests', function() {
      beforeEach(done => {
        Activities.remove({}, function() {
          Meteor.call(
            'prepareActivityData',
            {
              activitesCollection: activitiesForTestingActivityLevelConditions,
            },
            done
          );
        });
      });

      describe('getHomeActivityLevelCounts', function() {
        it('Should return inactive for residents with no activity, semi-active for those with < 5 days of activity and active for residents over 5 days of activities', function(done) {
          Meteor.call('getHomeActivityLevelCounts', '112', function(
            err,
            result
          ) {
            expect(result).to.deep.eq({
              inactive: 1,
              semiActive: 1,
              active: 1,
            });
            done();
          });
        });

        it('Should return no count if active raisdents are not found', function(done) {
          Meteor.call('getHomeActivityLevelCounts', '12', function(
            err,
            result
          ) {
            expect(result).to.deep.eq({
              inactive: 0,
              semiActive: 0,
              active: 0,
            });
            done();
          });
        });
      });

      describe('getActivityPercentageForAGivenHome', function() {
        it('Should return percentage of active and inactive users', function(done) {
          Meteor.call(
            'getActivityPercentageForAGivenHome',
            '112',
            function(err, result) {
              expect(result[0]).to.deep.eq({
                type: 'inactive',
                count: 1,
                homePercentage: 33,
              });
              expect(result[1]).to.deep.eq({
                type: 'semiActive',
                count: 1,
                homePercentage: 33,
              });
              expect(result[2]).to.deep.eq({
                type: 'active',
                count: 1,
                homePercentage: 33,
              });
              done();
            }
          );
        });

        it('Should return 0 when home has no active residents', function(done) {
          Meteor.call(
            'getActivityPercentageForAGivenHome',
            '12',
            function(err, result) {
              expect(result[0]).to.deep.eq({
                type: 'inactive',
                count: 0,
                homePercentage: 0,
              });
              expect(result[1]).to.deep.eq({
                type: 'semiActive',
                count: 0,
                homePercentage: 0,
              });
              expect(result[2]).to.deep.eq({
                type: 'active',
                count: 0,
                homePercentage: 0,
              });
              done();
            }
          );
        });
      });
    });
  });
}
