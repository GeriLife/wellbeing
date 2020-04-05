import UserEventLog from '/both/collections/userEventLog';

Settings = new Mongo.Collection('settings');

Settings.allow({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  },
});

if (Meteor.isServer) {
  // Make sure settings names are unique
  Settings._ensureIndex({ name: 1 }, { unique: 1 });
}

Settings.after.insert(function(userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'setting',
    entityId: setting._id,
  });
});

Settings.after.update(function(userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'setting',
    entityId: setting._id,
  });
});

Settings.after.remove(function(userId, setting) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'setting',
    entityId: setting._id,
  });
});

export const SettingsCollection = Settings;
