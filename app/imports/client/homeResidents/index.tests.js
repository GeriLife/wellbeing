import residentsTable from './residentsTable.tests';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import StubCollections from 'meteor/hwillson:stub-collections';
import {
  activitesCollection,
  residencyData,
  residentsData,
  homesData,
} from '../mockData.tests';

/* Importing collection to stub */
import { ActivitiesCollection as Activities } from '../../../both/collections/activities';
import { ResidenciesCollection as Residencies } from '../../../both/collections/residencies';
import { ResidentsCollection as Residents } from '../../../both/collections/residents';
import { HomesCollection as Homes } from '../../../both/collections/homes';

if (Meteor.isClient) {
  describe('Home residents', function() {
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

    residentsTable();
  });
}
