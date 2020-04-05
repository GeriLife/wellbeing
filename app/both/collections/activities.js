import moment from 'moment';
import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

Activities = new Mongo.Collection('activities');

Meteor.startup(function() {
  if (Meteor.isServer) {
    // Make sure activityDate field is indexed for performance
    Activities._ensureIndex({ activityDate: 1 });

    // Make sure residentIds field is indexed for performance
    Activities._ensureIndex({ residentIds: 1 });
  }
});

var ActivitiesSchema = new SimpleSchema({
  residentIds: {
    type: Array,
  },
  'residentIds.$': {
    type: String,
  },
  activityTypeId: {
    type: String,
  },
  activityDate: {
    type: Date,
    min: function() {
      // Only allow activities to be recorded for the past seven days
      // based on end of current day
      return new moment()
        .endOf('day')
        .subtract(7, 'days')
        .toDate();
    },
    max: function() {
      // Do not allow activity dates in the future
      return new Date();
    },
  },
  duration: {
    type: Number,
  },
  facilitatorRoleId: {
    type: String,
  },
});

// Attach schema to collection
Activities.attachSchema(ActivitiesSchema);

Activities.helpers({
  residentNames: function() {
    // Get the Resident ID;
    const residentIds = this.residentIds;

    // Get Resident(s) from Residents collection, by ID(s)
    const residents = Residents.find({
      _id: { $in: residentIds },
    }).fetch();

    // Create an array of resident names
    const residentNamesArray = _.map(residents, function(resident) {
      return resident.firstName;
    });

    // Return the resident name(s), joining with ", "
    return residentNamesArray.join(', ');
  },
  activityType: function() {
    // Get the Activity Type ID
    var activityTypeId = this.activityTypeId;

    // Get Activity Type from Activity Types collection, by ID
    var activityType = ActivityTypes.findOne(activityTypeId);

    // Return the Activity Type name
    return activityType.name;
  },
  activityDateFormatted: function() {
    // Get activity date
    var activityDate = this.activityDate;

    // Format activity date
    return moment(activityDate).format('D.M.YYYY');
  },
  facilitatorRole: function() {
    // Get the facilitator Role ID
    var facilitatorRoleId = this.facilitatorRoleId;

    // Get Role from Roles collection, by ID
    var facilitatorRole = Meteor.roles.findOne(facilitatorRoleId);

    // Return the Role name
    return facilitatorRole.name;
  },
  timeAgo: function() {
    var activityDate = this.activityDate;

    var timeAgo = moment(activityDate).fromNow();

    return timeAgo;
  },
});

Activities.allow({
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

Activities.after.insert(function(userId, activity) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'activity',
    entityId: activity._id,
  });
});

Activities.after.update(function(userId, activity) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'activity',
    entityId: activity._id,
  });
});

Activities.after.remove(function(userId, activity) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'activity',
    entityId: activity._id,
  });
});

export const ActivitiesCollection = Activities;
