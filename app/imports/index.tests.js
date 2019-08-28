import { adminUser } from './mockData.tests';
import { createTestUser } from './utils.tests';
/* Add an admin user as the first user is alway admin */
Meteor.startup(function() {
  createTestUser(adminUser);
});
