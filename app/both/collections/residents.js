import moment from 'moment';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(["autoform"]);
import UserEventLog from '/both/collections/userEventLog';
import { checkUserPermissions } from '../utils';

Residents = new Mongo.Collection('residents');

var ResidentsSchema = new SimpleSchema({
  firstName: {
    type: String,
    autoform: {
      readonly() {
        return !isUserAdmin() ? isEdit(this) : false
      }
    },
    custom() {
      return !isUserAdmin()
        ? isEdit(this)
          ? "notAllowed"
          : undefined
        : undefined;
    }
  },
  lastInitial: {
    type: String,
    max: 1,
    autoform: {
      readonly() {
        return !isUserAdmin() ? isEdit(this) : false
      }
    },
    custom() {
      return !isUserAdmin()
        ? isEdit(this)
          ? "notAllowed"
          : undefined
        : undefined;
    }
  },
  interestsDescription: {
    type: String,
    optional: true
  },
  onHiatus: {
    type: Boolean,
    defaultValue: false
  }
});

Residents.attachSchema(ResidentsSchema);

Residents.helpers({
  fullName: function () {
    // First name and last initial
    var firstName = this.firstName;
    var lastInitial = this.lastInitial;

    if (firstName && lastInitial) {
      return firstName + " " + lastInitial;
    } else {
      return firstName;
    }

  },
  'activities': function () {
    // Get resident ID
    var residentId = this._id;

    // Get today's date
    var now = moment().toDate();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({'residentIds': residentId, activityDate: {$lte: now}}, {sort : {activityDate:  -1} });
  },
  'recentActivities': function () {
    // Get resident ID
    var residentId = this._id;

    // Date two weeks ago
    var twoWeeksAgo = moment().subtract(2, "weeks").toDate();

    // Date today
    var now = new Date();

    // Get all activities involving resident
    // make sure activities are in the past (i.e. not planned)
    //  sort in reverse order by activity date
    return Activities.find({'residentIds': residentId, activityDate: {$gte: twoWeeksAgo, $lte: now}}, {sort : {activityDate:  -1} });
  }
});

Residents.allow({
  insert: function (userId, doc) {
    const schemaType = "resident";
    const action = "insert";
    
    return checkUserPermissions({ schemaType, action, userId, doc });
  },
  update: function (userId, doc) {
    const schemaType = "resident";
    const action = "update";
    const residentId = doc._id;
    const activeResidency = Residencies.findOne({ $and: [{ residentId }, { moveOut: { $exists: false } }] });
    doc.homeId = activeResidency.homeId
    
    return checkUserPermissions({
      schemaType,
      action,
      userId,
      doc
    });
  },
  remove: function (userId, doc) {
    const schemaType = "resident";
    const action = "remove";
    const residentId = doc._id;
    const activeResidency = Residencies.findOne({ $and: [{ residentId }, { moveOut: { $exists: false } }] });
    doc.homeId = activeResidency.homeId
    return checkUserPermissions({ schemaType, action, userId, doc });
  }
});

Residents.after.insert(function (userId, resident) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'resident',
    entityId: resident._id,
  })
});

Residents.after.update(function (userId, resident) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'resident',
    entityId: resident._id,
  })
});

Residents.after.remove(function (userId, resident) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'resident',
    entityId: resident._id,
  })
});

function isUserAdmin(){
    /* 
      User Rights:
      Only admin can change the name of a resident. 
      A manager can change the onHiatus field but not the name.
      A  normal user can change none
    */
    const userId = Meteor.userId();
    return Roles.userIsInRole(userId, ["admin"])
  
}

function isEdit(that){
  return !!this.docId;
}