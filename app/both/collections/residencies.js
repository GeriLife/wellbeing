import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

Residencies = new Mongo.Collection('residencies');

var ResidenciesSchema = new SimpleSchema({
  residentId: {
    type: String
  },
  homeId: {
    type: String,
    custom() {
      return !!this.docId ? 'notAllowed' : undefined;
    },
  },
  moveIn: {
    type: Date,
    autoValue: function() {
      if (this.isSet) {
        // Get move in date from form
        const moveInDate = new Date(this.value);

        // set move in to midnight UTC
        moveInDate.setUTCHours(0, 0, 0, 0);

        return moveInDate;
      }
    }
  },
  moveOut: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isSet) {
        // Get move out date from form
        const moveOutDate = new Date(this.value);

        if (moveOutDate) {
          // set move out to midnight UTC
          moveOutDate.setUTCHours(0, 0, 0, 0);

          return moveOutDate;
        }
      }
    },
    custom() {
      const moveOut = this.value;
      const moveIn = this.field("moveIn").value;
      const result = validateDate(moveIn, moveOut);
      if (!result) {
        return "badDate";
      }
    }
  }
});

Residencies.attachSchema(ResidenciesSchema);

Residencies.allow({
  insert: function () {
    return false
  },
  update: function () {
   return false
  },
  remove: function (userId) {
    return false;
  }
});

Residencies.after.insert(function (userId, residency) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'insert',
    entityType: 'residency',
    entityId: residency._id,
  })
});

Residencies.after.update(function (userId, residency) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'update',
    entityType: 'residency',
    entityId: residency._id,
  })
});

Residencies.after.remove(function (userId, residency) {
  // Add event log
  UserEventLog.insert({
    userId,
    action: 'remove',
    entityType: 'residency',
    entityId: residency._id,
  })
});


/*
Verifies whether the move out date
if specified is always greater than move in Date
*/
function validateDate(moveIn, moveOut) {
  const moveOutDate = new Date(moveOut).getTime();
  const moveInDate = new Date(moveIn).getTime();
  /* it checks if move-out date if exists and is before
  the move-in date it will throw an error */
  if (!isNaN(moveOutDate) && moveOutDate > 0 && moveInDate > moveOutDate) return false
  /*
  In all other cases, i.e
  1) if the moveOut date is not specified or
  2) it is a date greater than move in date, it returns true */
  return true
}

export const ResidenciesCollection = Residencies
