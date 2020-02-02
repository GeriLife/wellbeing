import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import {
  activitiesForTestingActivityLevelConditions,
  residencyData,
  homesData,
  residentsScenario2,
} from './mockData.tests';
import { expect } from 'chai';

/* Importing collection to stub */
import { ActivitiesCollection as Activities } from '../../both/collections/activities';
import { ResidenciesCollection as Residencies } from '../../both/collections/residencies';
import { ResidentsCollection as Residents } from '../../both/collections/residents';
import { HomesCollection as Homes } from '../../both/collections/homes';

if (Meteor.isServer) {
  describe('Home residents methods', function() {
    beforeEach(function(done) {
      /* Stub */
      resetDatabase(null, function() {
        StubCollections.stub(Activities);
        StubCollections.stub(Residencies);
        StubCollections.stub(Residents);
        StubCollections.stub(Homes);

        /* Prepare Data */
        Meteor.call(
          'prepareActivityData',
          {
            roles: [],
            activityTypes: [],
            activitesCollection: activitiesForTestingActivityLevelConditions,
            aggregateData: [],
            residencyData,
            residentsData: residentsScenario2,
            homesData,
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
      StubCollections.restore(Homes);
      resetDatabase(null, done);
    });

    describe('getHomeDetails', function() {
      it('Should throw error if homeId is not defined', function(done) {
        Meteor.call('getHomeDetails', function(err, resp) {
          expect(err.message).to.eq('User id is mandatory [500]');
          done();
        });
      });

      it('If input is correct it should return related home information', function(done) {
        Meteor.call('getHomeDetails', '1', function(err, resp) {
          expect(resp).to.contains(homesData[0]);
          done();
        });
      });
    });

    describe('getResidentRecentActiveDays', function() {
      it('Should take current date as default and give activities done in last 7 days', function(done) {
        Meteor.call(
          'getResidentRecentActiveDays',
          'DmJdgv6vZQ42MFerG',
          function(err, result) {
            expect(result.length).to.eq(7);
            expect(
              result.map(r => r.residentWasActive)
            ).to.have.members([
              false,
              false,
              false,
              false,
              false,
              true,
              true,
            ]);
            done();
          }
        );
      });

      it('When data is not present, all 7 days must be false', function(done) {
        Meteor.call(
          'getResidentRecentActiveDays',
          'DmJdgv6vZQ42MFerG',
          '2020-01-01',
          function(err, result) {
            expect(result.length).to.eq(7);
            expect(
              result.map(r => r.residentWasActive)
            ).to.have.members([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ]);
            done();
          }
        );
      });
    });

    describe('getResidentRecentActiveDaysAndCount', function() {
      it('Should take current date as default and give activities done in last 7 days', function(done) {
        Meteor.call(
          'getResidentRecentActiveDaysAndCount',
          'DmJdgv6vZQ42MFerG',
          function(err, result) {
            const { recentActiveDays, activeDaysCount } = result;
            expect(recentActiveDays.length).to.eq(7);
            expect(
              recentActiveDays.map(r => r.residentWasActive)
            ).to.have.members([
              false,
              false,
              false,
              false,
              false,
              true,
              true,
            ]);
            expect(activeDaysCount).to.eq(2);
            done();
          }
        );
      });

      it('When data is not present, all 7 days must be false', function(done) {
        Meteor.call(
          'getResidentRecentActiveDaysAndCount',
          'DmJdgv6vZQ42MFerG',
          '2020-01-01',
          function(err, result) {
            const { recentActiveDays, activeDaysCount } = result;
            expect(recentActiveDays.length).to.eq(7);
            expect(
              recentActiveDays.map(r => r.residentWasActive)
            ).to.have.members([
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ]);
            expect(activeDaysCount).to.eq(0);
            done();
          }
        );
      });
    });

    describe('getHomeCurrentAndActiveResidents', function() {
      it('Should throw error if no homeId passed', function(done) {
        Meteor.call('getHomeCurrentAndActiveResidents', function(
          err
        ) {
          expect(err.message).to.eq('User id is mandatory [500]');
          done();
        });
      });

      it('Should return residents list', function(done) {
        Meteor.call(
          'getHomeCurrentAndActiveResidents',
          '112',
          function(err, result) {
            expect(result.length).to.eq(1);
            expect(result[0]).to.contain({
              _id: 'DmJdgv6vZQ42MFerG',
              firstName: 'kirti',
              lastInitial: 'K',
              onHiatus: false,
            });
            done();
          }
        );
      });
    });
  });
}
