import { expect } from 'chai';
import moment from 'moment';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import {
  feelingsData,
  activitiesForTestingActivityLevelConditions,
  residencyData,
  residentsScenario3,
  roles,
  activityTypes,
} from './mockData.spec';


/* Importing collection to stub */
import { feelingsCollection as Feelings } from '../../both/collections/feelings';
import { ActivitiesCollection as Activities } from '../../both/collections/activities';
import { ResidenciesCollection as Residencies } from '../../both/collections/residencies';
import { ResidentsCollection as Residents } from '../../both/collections/residents';
import { ActivityTypesCollection as ActivityTypes } from '../../both/collections/activityTypes';

if (Meteor.isServer) {
  describe('/resident', function() {
    beforeEach(function(done) {
      /* Stub */
      resetDatabase();
      StubCollections.stub(Feelings);
      StubCollections.stub(Activities);
      StubCollections.stub(Residencies);
      StubCollections.stub(Residents);
      StubCollections.stub(ActivityTypes);
      StubCollections.stub(Meteor.roles);

      /* Prepare Data */
      Meteor.call(
        'prepareActivityData',
        {
          feelingsData,
          roles,
          activityTypes,
          activitesCollection: activitiesForTestingActivityLevelConditions,
          residencyData,
          residentsData: residentsScenario3,
        },
        done
      );
    });

    afterEach(function() {
      /* Restore stubs */
      StubCollections.restore(Feelings);
      StubCollections.restore(Activities);
      StubCollections.restore(Residencies);
      StubCollections.restore(Residents);
      StubCollections.restore(ActivityTypes);
      StubCollections.restore(Meteor.roles);
      resetDatabase();
    });

    describe('Feelings chart', function() {
      it('Should return empty array when resident id does not have any recorded feelings', function(done) {
        Meteor.call(
          'getFeelingsPercentagesByResidentId',
          'nonExisitentId',
          function(err, result) {
            expect(result.length).to.eq(0);
            done();
          }
        );
      });

      it('Should return percentage of each feeling array recoreded for a given resident', function(done) {
        Meteor.call(
          'getFeelingsPercentagesByResidentId',
          'DJJggv6vZQ42MFerG',
          function(err, result) {
            expect(result.length).to.eq(2);
            expect(result[0].key).to.eq('joy');
            expect(result[0].key).to.eq('joy');
            expect(result[0].value).to.eq(1 / 3);
            expect(result[1].value).to.eq(2 / 3);
            done();
          }
        );
      });
    });

    describe('Activity trend chart', function() {
      it('Must aggregate activities done by the resident by time period', function(done) {
        Meteor.call(
          'getResidentAggregatedActivities',
          'DJJggv6vZQ42MFerG',
          'week',
          function(error, result) {
            expect(result.length).to.eq(1);
            expect(result[0].key).to.eq('type1');
            const totalCount = result[0].values.reduce(
              (sum, val) => sum + val.value.activity_count,
              0
            );
            expect(totalCount).to.eq(6);

            const totalMinutes = result[0].values.reduce(
              (sum, val) => sum + val.value.activity_minutes,
              0
            );
            expect(totalMinutes).to.eq(30);
            done();
          }
        );
      });
    });

    describe('Counts charts', function() {
      describe('getResidentActvitiesWithActivityAndFaciltatorName', function() {
        it('Should return activities of resident with activity name and role name', function(done) {
          Meteor.call(
            'getResidentActvitiesWithActivityAndFaciltatorName',
            'DmJdgv6vZQ42MFerG',
            function(err, result) {
              expect(result.length).to.eq(2);
              expect(result[0].activityTypeName).to.eq('type1');
              expect(result[0].facilitatorRoleName).to.eq('role2');
              expect(result[1].activityTypeName).to.eq('type1');
              expect(result[1].facilitatorRoleName).to.eq('role2');
              done();
            }
          );
        });
      });

      describe('getCountsByType', function() {
        it('Should throw error if resident or type not defined', function(done) {
          Meteor.call(
            'getCountsByType',
            'DJJggv6vZQ42MFerG',
            function(err, result) {
              expect(err.message).to.eq(
                'Type and resident ids are required [500]'
              );
              done();
            }
          );
        });

        it('Should return activity counts if `ActivityName` is passed', function(done) {
          Meteor.call(
            'getCountsByType',
            'DJJggv6vZQ42MFerG',
            'activityTypeName',
            function(err, result) {
              expect(result.length).to.eq(1);
              expect(result[0].key).to.eq('type1');
              expect(result[0].value).to.eq(6);
              done();
            }
          );
        });

        it('Should return activity counts if `facilitatorRoleName` is passed', function(done) {
          Meteor.call(
            'getCountsByType',
            'DJJggv6vZQ42MFerG',
            'facilitatorRoleName',
            function(err, result) {
              expect(result.length).to.eq(1);
              expect(result[0].key).to.eq('role2');
              expect(result[0].value).to.eq(6);
              done();
            }
          );
        });
      });

      describe('getDaywiseActivityDuration', function() {
        it('Should return the total duration of activities for each day', function(done) {
          Meteor.call(
            'getDaywiseActivityDuration',
            'DJJggv6vZQ42MFerG',
            function(err, result) {
              expect(result.length).to.eq(6);
              const refDate = moment();

              expect(
                result.map(r =>
                  moment(new Date(r.timestamp)).format('DD-MM-YYYY')
                )
              ).to.have.members([
                refDate.format('DD-MM-YYYY'),
                refDate.subtract(1, 'days').format('DD-MM-YYYY'),
                refDate.subtract(1, 'days').format('DD-MM-YYYY'),
                refDate.subtract(1, 'days').format('DD-MM-YYYY'),
                refDate.subtract(1, 'days').format('DD-MM-YYYY'),
                refDate.subtract(1, 'days').format('DD-MM-YYYY'),
              ]);
              expect(result.map(r => r.duration)).to.have.members([
                5,
                5,
                5,
                5,
                5,
                5,
              ]);
              done();
            }
          );
        });
      });
    });
  });
}
