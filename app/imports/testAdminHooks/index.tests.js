import { expect } from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';

/* Importing collection to stub */

const Permissions = require('../../both/collections/permissions');
const ActivityTypes = require('../../both/collections/activityTypes');
const Settings = require('../../both/collections/settings');
const UserEventLog = require('../../both/collections/userEventLog');

/* Import mock data variables */
import {
  PermissionsObject,
  ActivityTypesObject,
  SettingsObject,
  UserEventLogObject,
  PermissionsBaseObject,
  ActivityTypesBaseObject,
  SettingsBaseObject,
  UserEventLogBaseObject,
} from './mockData.tests';
import { adminUser, nonAdminUser } from '../mockData.tests';

import { setupDbUsser, destroyDbUser, login } from '../utils.tests';

/* Crud operations */

function adminCrud(collection, { insertObject, updateObj }) {
  let insertId, rowsUpdated, rowsRemoved;
  before(function(cb) {
    StubCollections.stub(collection);
    collection.insert(insertObject, function(err, id) {
      if (err) {
        cb();
      } else {
        insertId = id;
        collection.update({ _id: id }, updateObj, function(
          updateErr,
          updateNoOfRows
        ) {
          if (updateErr) {
            cb();
          } else {
            rowsUpdated = updateNoOfRows;
            collection.remove(id, function(removeErr, removeRows) {
              if (removeErr) {
                cb();
              } else {
                rowsRemoved = removeRows;
                cb();
              }
            });
          }
        });
      }
    });
  });

  it('Insert should be allowed', function(done) {
    expect(insertId).to.exist;
    expect(/^[A-Za-z0-9]{17}$/.test(insertId)).to.be.true;
    done();
  });

  it('Update should be allowed', function(done) {
    expect(rowsUpdated).to.exist;
    expect(rowsUpdated).to.equal(1);
    done();
  });

  it('Remove should be allowed', function(done) {
    expect(rowsRemoved).to.exist;
    expect(rowsRemoved).to.equal(1);
    done();
  });
  after(function(done) {
    if (insertId) {
      collection.remove(insertId, done);
    } else {
      done();
    }
  });
}

function nonAdminCrud(
  collection,
  { insertObject, updateId, updateObj }
) {
  let insertId, rowsUpdated, rowsRemoved;
  before(function(cb) {
    collection.insert(insertObject, function(err, id) {
      insertId = id;
      collection.update({ _id: updateId }, updateObj, function(
        updateErr,
        updateNoOfRows
      ) {
        if (updateErr) {
          cb();
        } else {
          rowsUpdated = updateNoOfRows;

          collection.remove(updateId, function(
            removeErr,
            removeRows
          ) {
            if (removeErr) {
              cb();
            } else {
              rowsRemoved = removeRows;
              cb();
            }
          });
        }
      });
    });
  });

  it('Insert should be allowed only for userEventLog', function(done) {
    if (collection === UserEventLog) {
      expect(/^[A-Za-z0-9]{17}$/.test(insertId)).to.be.true;
    } else {
      expect(insertId).to.equal(undefined);
    }

    done();
  });

  it('Update should not be allowed', function(done) {
    expect(rowsUpdated).to.equal(0);
    done();
  });

  it('Remove should not be allowed', function(done) {
    expect(rowsRemoved).to.equal(0);
    done();
  });
  after(function(done) {
    if (insertId) {
      collection.remove(insertId, done);
    } else {
      done();
    }
  });
}
describe('admin insert test', function() {
  before(done => {
    login(adminUser.email, adminUser.password, done);
  });
  describe(`Admin crud for Permissions`, () =>
    adminCrud(Permissions, {
      insertObject: PermissionsObject,
      updateObj: { $set: { groupId: 'updated-group-id' } },
    }));
  describe(`Admin crud for ActivityTypes`, () =>
    adminCrud(ActivityTypes, {
      insertObject: ActivityTypesObject,
      updateObj: { $set: { name: 'updated name' } },
    }));
 
  describe(`Admin crud for Settings`, () =>
    adminCrud(Settings, {
      insertObject: SettingsObject,
      updateObj: { $set: { name: 'updated name' } },
    }));
  describe(`Admin crud for UserEventLog`, () =>
    adminCrud(UserEventLog, {
      insertObject: UserEventLogObject,
      updateObj: { $set: { action: 'updated action' } },
    }));

  after(done => {
    StubCollections.restore();
    Meteor.logout(done);
  });
});

describe('Non-admin crud', function() {
  let Permissionsid;
  let ActivityTypesid;
  let Settingsid;
  let UserEventLogid;
  before(done => {
    StubCollections.stub([
      Permissions,
      ActivityTypes,
      Settings,
      UserEventLog,
    ]);

    login(adminUser.email, adminUser.password, function() {
      Permissionsid = Permissions.insert(PermissionsBaseObject);
      ActivityTypesid = ActivityTypes.insert(ActivityTypesBaseObject);
      Settingsid = Settings.insert(SettingsBaseObject);
      UserEventLogid = UserEventLog.insert(UserEventLogBaseObject);
      setupDbUsser(nonAdminUser, done);
    });
  });

  describe(`Admin crud for Permissions`, () =>
    nonAdminCrud(Permissions, {
      insertObject: PermissionsObject,
      updateId: Permissionsid,
      updateObj: { $set: { groupId: 'updated-group-id' } },
    }));
  describe(`Non-admin crud for ActivityTypes`, () =>
    nonAdminCrud(ActivityTypes, {
      insertObject: ActivityTypesObject,
      updateId: ActivityTypesid,
      updateObj: { $set: { name: 'updated name' } },
    }));
  describe(`Non-admin crud for Settings`, () =>
    nonAdminCrud(Settings, {
      insertObject: SettingsObject,
      updateId: Settingsid,
      updateObj: { $set: { name: 'updated name' } },
    }));
  describe(`Non-admin crud for UserEventLog`, () =>
    nonAdminCrud(UserEventLog, {
      insertObject: UserEventLogObject,
      updateId: UserEventLogid,
      updateObj: { $set: { action: 'updated action' } },
    }));

  after(done => {
    Meteor.logout(function() {
      destroyDbUser(nonAdminUser.email, function() {
        StubCollections.restore();
        done();
      });
    });
  });
});
