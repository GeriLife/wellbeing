import { expect } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import {
  activitesCollection,
  residencyData,
  roles,
  residentsData,
  activitiesForTestingActivityLevelConditions,
  residentsScenario1,
  residentsScenario2,
  residentsScenario3,
  activitySummaryData,
  activitySummaryResidency,
  activitySummaryResident,
  activityTypes,
} from './mockData.tests';

/* Importing collection to stub */
import { ActivitiesCollection as Activities } from '../../both/collections/activities';
import { ResidenciesCollection as Residencies } from '../../both/collections/residencies';
import { ResidentsCollection as Residents } from '../../both/collections/residents';
import moment from 'moment';

if (Meteor.isServer) {
  describe('/homes - Activity levels charts', function() {
    beforeEach(function(done) {
      /* Stub */
      resetDatabase(null, function() {
        StubCollections.stub(Activities);
        StubCollections.stub(Residencies);
        StubCollections.stub(Residents);

        /* Prepare Data */
        Meteor.call(
          'prepareActivityData',
          {
            roles,
            activitesCollection,
            aggregateData: [],
            residencyData,
            residentsData: [
              ...residentsData,
              ...residentsScenario1,
              ...residentsScenario2,
              ...residentsScenario3,
            ],
            activityTypes,
          },
          done
        );
      });
    });

    afterEach(function(done) {
      /* Restore stubs */
      StubCollections.restore(Activities);
      StubCollections.restore(Residencies);
      StubCollections.restore(Residents);
      resetDatabase(null, done);
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

        it('Should return no count if active residents are not found', function(done) {
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

      describe('getHomeActivityCountTrend', function() {
        beforeEach(function(done) {
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

        it('Should expect data to be returned for 6 days days each starting 6 days from today', function(done) {
          Meteor.call('getHomeActivityCountTrend', '112', function(
            err,
            res
          ) {
            expect(res.activityCounts.length).to.eq(7);
            expect(res.activityCounts).to.have.members([
              0,
              0,
              0,
              0,
              0,
              1,
              1,
            ]);

            expect(res.inactivityCounts.length).to.eq(7);
            expect(res.inactivityCounts).to.have.members([
              3,
              2,
              2,
              2,
              2,
              1,
              1,
            ]);

            expect(res.semiActivityCounts.length).to.eq(7);
            expect(res.semiActivityCounts).to.have.members([
              0,
              1,
              1,
              1,
              1,
              1,
              1,
            ]);

            expect(res.date.length).to.eq(7);
            const endDate = moment();
            const startDate = moment(endDate).subtract(6, 'days');
            expect(moment(res.date[0]).format('YYYY-MM-DD')).to.eq(
              startDate.format('YYYY-MM-DD')
            );
            expect(moment(res.date[6]).format('YYYY-MM-DD')).to.eq(
              endDate.format('YYYY-MM-DD')
            );
            done();
          });
        });
      });
    });

    describe('getResidentActivitiesByType, getMinutesOfResidentActivitiesByType and getCountOfResidentActivitiesByType', function() {
      beforeEach(function(done) {
        Meteor.call(
          'prepareActivityData',
          {
            activitesCollection: activitySummaryData,
            residencyData: activitySummaryResidency,
            residentsData: activitySummaryResident,
          },
          done
        );
      });

      afterEach(function(done) {
        Activities.remove(
          { activityTypeId: 'activityTestActId' },
          function() {
            Residencies.remove(
              { activityTypeId: 'activityTestActId' },
              function() {
                Residents.remove(
                  { activityTypeId: 'activityTestActId' },
                  done
                );
              }
            );
          }
        );
      });

      it('Should return all activities of a type for the given resident', function(done) {
        Meteor.call(
          'getResidentActivitiesByType',
          {
            residentId: 'activityTestResId',
            activityTypeId: 'activityTestActId',
            period: '7',
          },
          function(err, result) {
            expect(Object.keys(result[0])).to.have.members([
              '_id',
              'activityTypeId',
              'facilitatorRoleId',
              'activityDate',
              'residentIds',
              'duration',
            ]);
            expect(result[0].activityTypeId).to.eq(
              'activityTestActId'
            );
            expect(result[1].activityTypeId).to.eq(
              'activityTestActId'
            );
            done();
          }
        );
      });

      it('Should return count of an activity for the given resident', function(done) {
        Meteor.call(
          'getCountOfResidentActivitiesByType',
          {
            residentId: 'activityTestResId',
            activityTypeId: 'activityTestActId',
            period: '7',
          },
          function(err, result) {
            expect(result).to.eq(2);
            done();
          }
        );
      });

      it('Should return minutes of the activity', function(done) {
        Meteor.call(
          'getMinutesOfResidentActivitiesByType',
          {
            residentId: 'activityTestResId',
            activityTypeId: 'activityTestActId',
            period: '7',
          },
          function(err, result) {
            expect(result).to.eq(30);

            done();
          }
        );
      });

      it('Should return 0 minutes if no activity was recorded', function(done) {
        Meteor.call(
          'getMinutesOfResidentActivitiesByType',
          {
            residentId: 'NA',
            activityTypeId: 'NA',
            period: '7',
          },
          function(err, result) {
            expect(result).to.eq(0);

            done();
          }
        );
      });

      it('Should return 0 count if no activities found', function(done) {
        Meteor.call(
          'getCountOfResidentActivitiesByType',
          {
            residentId: 'nonExistentResId',
            activityTypeId: 'nonExistentActId',
            period: '7',
          },
          function(err, result) {
            expect(result).to.eq(0);
            done();
          }
        );
      });

      describe('getHomeResidentsActivitySumsByType', function() {
        it('Should return actve residents and their activity counts', function(done) {
          Meteor.call(
            'getHomeResidentsActivitySumsByType',
            {
              homeId: '1',
              period: '30',
            },
            function(err, res) {
              expect(res.length).to.eq(4);
              expect(
                res.map(r => r.key).includes('activityTestActId')
              ).to.eq(true);
              const activityUser = res.find(
                residentIdValues =>
                  residentIdValues.key === 'activityTestActId'
              );

              expect(activityUser.values[1].count).to.eq(2);
              expect(activityUser.values[1].minutes).to.eq(30);
              done();
            }
          );
        });
      });

      describe('getHomeActivityTypeMetrics', function() {
        it('Should return activities aggregated by time having total minutes and count', function(done) {
          Meteor.call(
            'getHomeActivityTypeMetrics',
            {
              homeId: '1',
              period: '30',
            },
            function(err, res) {
              expect(res.length).to.eq(1);
              expect(res[0].key).to.eq('activityTestActId');

              expect(res[0].value).to.contains({
                count: 2,
                minutes: 30,
              });
              done();
            }
          );
        });
      });

      
      describe('getHomeActivitiesFacilitatorRoleMetrics', function() {
        it('Should return activities aggregated by time having total minutes and count', function(done) {
          Meteor.call(
            'getHomeActivitiesFacilitatorRoleMetrics',
            {
              homeId: '1',
              period: '7',
            },
            function(err, res) {
              expect(res.length).to.eq(1);
              expect(res[0].key).to.eq('role1');

              expect(res[0].value).to.contains({
                count: 2,
                minutes: 30,
              });
              done();
            }
          );
        });
      });

      describe('getHomeCurrentResidentsActivityIds', function() {
        it('Should return activities corresponding to current residents of a given home', function(done) {
          Meteor.call(
            'getHomeCurrentResidentsActivityIds',
            {
              homeId: '1',
              period: '7',
            },
            function(err, result) {
              expect(result.length).to.eq(2);
              done();
            }
          );
        });
      });
    });
  });
}
