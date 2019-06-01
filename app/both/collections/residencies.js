import SimpleSchema from 'simpl-schema';
import UserEventLog from '/both/collections/userEventLog';

Residencies = new Mongo.Collection('residencies');

var ResidenciesSchema = new SimpleSchema({
  residentId: {
    type: String,
    custom() {

      const residentId = this.value;
      const moveOut = this.field('moveOut').value;
      const residencyId = this.docId;

      if (hasOtherActiveResidencies(residentId, residencyId, moveOut)) {
        /* Error message key to indicate the entry is not allowed */
        return 'notAllowed';
      }

    }
  },
  homeId: {
    type: String,
  },
  moveIn: {
    type: Date,
    autoValue: function () {
      if (this.isSet) {
        // Get move in date from form
        const moveInDate = new Date(this.value);

        // set move in to midnight UTC
        moveInDate.setUTCHours(0,0,0,0);

        return moveInDate;
      }
    }
  },
  moveOut: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isSet) {
        // Get move out date from form
        const moveOutDate = new Date(this.value);

        if (moveOutDate) {
          // set move out to midnight UTC
          moveOutDate.setUTCHours(0,0,0,0);

          return moveOutDate;
        }
      }
    },
    custom() {
      const moveOut = this.value
      const moveIn = this.field('moveIn').value
      const result = validateDate(moveIn, moveOut)
      if (!result) {
        return "badDate"
      }
    }
  },
});

Residencies.attachSchema(ResidenciesSchema);

Residencies.allow({
  'insert': function () {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for insert privilege check
    let userCanInsert;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanInsert = (userId && userIsAdministrator);

    return userCanInsert;
  },
  'update': function () {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for update privilege check
    let userCanUpdate;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanUpdate = (userId && userIsAdministrator);

    return userCanUpdate;
  },
  'remove': function () {
    // Get user ID
    let userId = Meteor.userId();

    // Placeholder for administrator check
    let userIsAdministrator;

    // Placeholder for insert privilege check
    let userCanRemove;

    if (userId) {
      // Check if user is administrator
      userIsAdministrator = Roles.userIsInRole(userId, ['admin']);
    }

    // Only allow adminstator users insert
    userCanRemove = (userId && userIsAdministrator);

    return userCanRemove;
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
Verifies whethers the move out date 
if specified is always greater than move in Date
*/
function validateDate(moveIn, moveOut) {
  const moveOutDate = new Date(moveOut).getTime();
  const moveInDate = new Date(moveIn).getTime();
  /* it checks if moveout date if exists and is before 
  the movein date it will throw an error */
  if (!isNaN(moveOutDate) && moveOutDate > 0 && moveInDate > moveOutDate) return false
  /* 
  In all other cases, i.e 
  1) if the moveOut date is not specified or 
  2) it is a date greater than move in date, it returns true */
  return true
}


/*Check if the current resident has other residencies */

function hasOtherActiveResidencies(residentId, residencyId, moveOut) {

  /* Move out date is set to 01-01-1970
  so need to check timestamp for validation  */
  const moveOutTimeStamp = new Date(moveOut).getTime();

  if (!moveOutTimeStamp > 0) {
    const condition = { residentId, moveOut: { $exists: false } };
    if (residencyId) {
      condition._id = { $ne: residencyId }
    }

    const activeResidencies = Residencies.find(condition).count();
    return activeResidencies > 0
  }

  /* If moveout date is added to current record
  it means that the residency to be inserted/updated is not active 
  so no need for checking*/
  return false
}