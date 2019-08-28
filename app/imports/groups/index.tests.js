import { expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';

/* Importing collection to stub */
const Groups = require('../../both/collections/groups');

/* Import mock data variables */
import {} from './mockData.tests';
import { nonAdminUser } from '../mockData.tests';

import { setupNonAdminDbUsser, destroyDbUser } from '../utils.tests';

function _before(done) {
  /* Steps to do before executing tests */
  /* 1. stub Groups collection */
  StubCollections.stub([Groups]);

  /* Login with a user */
  setupNonAdminDbUsser(nonAdminUser, done);
}

function _after(done) {
  StubCollections.restore();
  destroyDbUser(nonAdminUser.email, done);
}
