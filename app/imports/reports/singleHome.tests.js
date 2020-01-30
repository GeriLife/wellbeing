import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import {
  activitesCollection,
  residencyData,
  residentsData,
  homesData,
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
            activitesCollection,
            aggregateData: [],
            residencyData,
            residentsData,
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
  });
}


/* 
getResidentRecentActiveDaysAndCount
getHomeCurrentAndActiveResidents
getResidentRecentActiveDays
*/