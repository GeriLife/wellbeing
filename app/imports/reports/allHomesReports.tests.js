import { expect } from 'chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import {
  activityTypes,
  roles,
  annotateActivityInput,
  annotateActivityResult,
  annotatedActivites,
  aggregatedActivitiesByTypeAndWeek,
  aggregatedActivitiesByTypeAndMonth,
  aggregatedActivitiesByFaciliatatorAndWeek,
  aggregatedActivitiesByFaciliatatorAndMonth,
  activitesCollection,
} from './mockData.tests';

/* Importing collection to stub */
import { ActivitiesCollection as Activities } from '../../both/collections/activities';
import { ActivityTypesCollection as ActivityTypes } from '../../both/collections/activityTypes';
import AllHomesActivityReportAggregate from '../../both/collections/allHomesActivityReportAggregate';
const sinon = require('sinon').createSandbox();
if (Meteor.isServer) {
  describe('Activities', function() {
    const aggregateData = [
      {
        lastUpdatedDate: new Date(),
        aggregateBy: 'type',
        weeklyData: aggregatedActivitiesByTypeAndWeek,
        monthlyData: aggregatedActivitiesByTypeAndMonth,
      },
      {
        lastUpdatedDate: new Date(),
        aggregateBy: 'facilitator',
        weeklyData: aggregatedActivitiesByFaciliatatorAndWeek,
        monthlyData: aggregatedActivitiesByFaciliatatorAndMonth,
      },
    ];

    beforeEach(function(done) {
      /* Stub */
      resetDatabase(null, function() {
        StubCollections.stub(ActivityTypes);
        StubCollections.stub(Meteor.roles);
        StubCollections.stub(Activities);
        StubCollections.stub(AllHomesActivityReportAggregate);

        /* Prepare Data */
        Meteor.call(
          'prepareActivityData',
          {
            roles,
            activityTypes,
            activitesCollection,
            aggregateData,
          },
          done
        );
      });
    });

    afterEach(function(done) {
      /* Restore stubs */
      StubCollections.restore(ActivityTypes);
      StubCollections.restore(Meteor.roles);
      StubCollections.restore(Activities);
      StubCollections.restore(AllHomesActivityReportAggregate);
      resetDatabase(null, done);
    });

    describe('Annotate Activites', function() {
      it('For a list of activities it should append the names of linked roles and activity types', function(done) {
        Meteor.call(
          'annotateActivities',
          annotateActivityInput,
          function(err, result) {
            expect(result).to.deep.equal(annotateActivityResult);
            done();
          }
        );
      });
    });

    describe('Aggregate Activities', function() {
      it('Should group by activity name and week  by default', function(done) {
        Meteor.call(
          'aggregateActivities',
          annotatedActivites,
          'week',
          function(err, result) {
            expect(result).to.deep.equal(
              aggregatedActivitiesByTypeAndWeek
            );
            done();
          }
        );
      });

      it('Should be able to group by activity name and start of month', function(done) {
        Meteor.call(
          'aggregateActivities',
          annotatedActivites,
          'month',
          function(err, result) {
            expect(result).to.deep.equal(
              aggregatedActivitiesByTypeAndMonth
            );
            done();
          }
        );
      });

      it('Should be able to group by facilitator name and start of week', function(done) {
        Meteor.call(
          'aggregateActivities',
          annotatedActivites,
          'week',
          'facilitatorName',
          function(err, result) {
            expect(result).to.deep.equal(
              aggregatedActivitiesByFaciliatatorAndWeek
            );
            done();
          }
        );
      });

      it('Should be able to group by facilitator name and start of month', function(done) {
        Meteor.call(
          'aggregateActivities',
          annotatedActivites,
          'month',
          'facilitatorName',
          function(err, result) {
            expect(result).to.deep.equal(
              aggregatedActivitiesByFaciliatatorAndMonth
            );
            done();
          }
        );
      });
    });

    describe('getAggregatedActivities', function() {
      it('Should group by activity name and week ', function(done) {
        Meteor.call(
          'getAggregatedActivities',
          'week',
          'activityTypeName',
          function(err, result) {
            expect(result).to.deep.equal(
              aggregatedActivitiesByTypeAndWeek
            );
            done();
          }
        );
      });

      it('Should be able to group by activity name and start of month', function(done) {
        Meteor.call(
          'getAggregatedActivities',
          'month',
          'activityTypeName',
          function(err, result) {
            expect(result).to.deep.equal(
              aggregatedActivitiesByTypeAndMonth
            );
            done();
          }
        );
      });

      it('Should be able to group by facilitator name and start of week', function(done) {
        Meteor.call(
          'getAggregatedActivities',
          'week',
          'facilitatorName',
          function(err, result) {
            expect(result).to.deep.equal(
              aggregatedActivitiesByFaciliatatorAndWeek
            );
            done();
          }
        );
      });

      it('Should be able to group by facilitator name and start of month', function(done) {
        Meteor.call(
          'getAggregatedActivities',
          'month',
          'facilitatorName',
          function(err, result) {
            expect(result).to.deep.equal(
              aggregatedActivitiesByFaciliatatorAndMonth
            );
            done();
          }
        );
      });
    });

    describe('getAllHomeReportAggregates', function() {
      it('Should return appropriate data for each aggregation on success', function(done) {
        const expectedOutput = {
          weeklyDataByActivityType: aggregatedActivitiesByTypeAndWeek,
          monthlyDataByActivityType: aggregatedActivitiesByTypeAndMonth,
          weeklyDataByActivityFacilitator: aggregatedActivitiesByFaciliatatorAndWeek,
          monthlyDataByActivityFacilitator: aggregatedActivitiesByFaciliatatorAndMonth,
        };
        Meteor.call('getAllHomeReportAggregates', function(
          err,
          result
        ) {
          expect(result).to.deep.equal(expectedOutput);
          done();
        });
      });

      //Need to  find a way to stub method calls
      /* it('Should return return error message on failure', function(done) {
      Meteor.call('getAllHomeReportAggregates', function(
        err,
        result
      ) {
        console.log(err, result);
        expect(result).to.deep.equal(expectedOutput);
        done();
      }); 
    });*/

      afterEach(() => {
        sinon.restore();
      });
    });

    describe('getActivitiesAggregateReport', function() {
      it('Should throw error if aggregate by is not passed', function() {
        expect(
          Meteor.call.bind(
            Meteor,
            'getActivitiesAggregateReport',
            'week'
          )
        ).to.throw('Required aggregateBy field');
      });

      it('Should return type grouped data if type is passed', function(done) {
        Meteor.call(
          'getActivitiesAggregateReport',
          'week',
          'type',
          function(err, result) {
            expect(result.activityData.length).to.eq(3);
            done();
          }
        );
      });

      it('Should throw error if aggregate is not correct', function(done) {
        Meteor.call(
          'getActivitiesAggregateReport',
          'week',
          'no',
          function(err) {
            expect(err.message).to.eq(
              "Cannot read property 'lastUpdatedDate' of undefined"
            );
            done();
          }
        );
      });
    });
  });
}
