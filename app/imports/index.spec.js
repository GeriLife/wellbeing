import { adminUser } from './mockData.spec';
import { createTestUser } from './utils.spec';
/* Add an admin user as the first user is alway admin */
Meteor.startup(function() {
  createTestUser(adminUser);
});
