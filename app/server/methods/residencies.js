import newResidentAndResidencySchema from '/both/schemas/newResidentAndResidencySchema';
import { checkUserPermissions } from '/both/utils';

function addNewResidencyWithExistingResident(residencyInfo) {
  const schemaType = 'residency';
  const action = 'insert';
  const isOperationAllowed = checkUserPermissions({
    schemaType,
    action,
    userId: Meteor.userId(),
    doc: residencyInfo,
  });

  if (!isOperationAllowed) {
    throw Meteor.Error(500, 'Operation is not allowed');
  }

  return Residencies.insert(residencyInfo);
}

function editResidency({ _id, modifier }) {
  const schemaType = 'residency';
  const action = 'update';
  const residency = Residencies.findOne({
    $and: [
      {
        _id,
      },
      {
        moveOut: {
          $exists: true,
        },
      },
    ],
  });

  const hasDeparted = !residency ? false : true;
  const isOperationAllowed = checkUserPermissions({
    schemaType,
    action,
    userId: Meteor.userId(),
    doc: modifier.$set,
    hasDeparted,
  });

  if (!isOperationAllowed) {
    throw Meteor.Error(500, 'Operation not allowed');
  }

  return Residencies.update({ _id }, modifier);
}

// ToDo: enhance cases
function buildConditionWhenMoveOutExists({ moveOut, moveIn }) {
  const otherActiveResidencyDuringCurrent = {
    $or: [],
  };

  //If a residency starts or end during current
  /*
  Existing Residency => |------
  Current Record => o------
  Cases:
  |-------------|   |--------------|
                 |--|
        o----------------------o
  */
  otherActiveResidencyDuringCurrent['$or'].push({
    $or: [
      {
        $and: [
          { moveOut: { $gte: moveIn } },
          { moveOut: { $lte: moveOut } },
        ],
      },
      {
        $and: [
          { moveIn: { $gte: moveIn } },
          { moveIn: { $lte: moveOut } },
        ],
      },
    ],
  });

  // If a current record is during another residency or it overlaps an active Residency
  /*
  Existing Residnecy => |------
  Current Record => o------
  Cases:
  |-------------------------------|
            |-------------------------
  |----------------------------
        o---------------o
  */
  otherActiveResidencyDuringCurrent['$or'].push({
    $and: [
      { moveIn: { $lt: moveOut } },
      {
        $or: [
          { moveOut: { $gte: moveOut } },
          { moveOut: { $exists: false } },
        ],
      },
    ],
  });
  return otherActiveResidencyDuringCurrent;
}

function buildConditionWhenMoveOutNotExists(moveIn) {
  const otherActiveResidencyDuringCurrent = {
    $or: [],
  };
  // If a residency ends after this moveIn
  /*
  Existing Residnecy => |------
  Current Record => o------
  Cases:
  |------------------|
      o-----------------------
  */
  otherActiveResidencyDuringCurrent['$or'].push({
    moveOut: { $gt: moveIn },
  });

  // If a residency starts after current moveIn
  /*
  Existing Residnecy => |------
  Current Record => o------
  Cases:
            |------------------|
        |------------------------
      o-----------------------
  */
  otherActiveResidencyDuringCurrent['$or'].push({
    moveIn: { $gte: moveIn },
  });

  // If there already exists an active residency
  /*
  Existing Residnecy => |------
  Current Record => o------
  Cases:
  |----------------------
      o-----------------------
  */
  otherActiveResidencyDuringCurrent['$or'].push({
    moveOut: { $exists: false },
  });
  return otherActiveResidencyDuringCurrent;
}

export default Meteor.methods({
  addNewResidentAndResidency(document) {
    const userId = Meteor.userId();
    const userPermission = checkUserPermissions({
      schemaType: 'resident',
      action: 'insert',
      userId,
      doc: document,
    });
    if (!userPermission) {
      throw new Meteor.Error(
        'operation-not-allowed',
        'Current User does not have enough rights to perform this action!'
      );
    }
    // set up validation context based on new resident and residency schama
    const validationContext = newResidentAndResidencySchema.newContext();


    //check user permission
    // Check if submitted document is valid
    const documentIsValid = validationContext.validate(document);
    if (documentIsValid) {
      // Get fields from object
      const { firstName, lastInitial, homeId, moveIn } = document;

      // Create new resident
      // TODO: migrate homeId out of resident schema
      const residentId = Residents.insert({ firstName, lastInitial });

      if (residentId) {
        // Insert residency document
        const residencyId = Residencies.insert({
          residentId,
          homeId,
          moveIn,
        });

        if (residencyId) {
          // Submission was successful
          return true;
        } else {
          // Could not create residency
          throw new Meteor.Error(
            'could-not-create-residency',
            'Could not create residency.'
          );
        }
      } else {
        // Could not create resident
        throw new Meteor.Error(
          'could-not-create-resident',
          'Could not create resident.'
        );
      }
    } else {
      // Document is not valid
      throw new Meteor.Error(
        'resident-and-residency-invalid',
        'Resident and residency document is not valid.'
      );
    }
  },
  getCurrentResidencies() {
    return Residencies.find({
      moveOut: {
        $exists: false,
      },
    }).fetch();
  },
  getUserVisibleResidencyIds(userId, includeDeparted) {
    const selector = {};

    const userIsAdmin = Roles.userIsInRole(userId, 'admin');

    // Admin should see all residencies
    // otherwise, check user group permissions
    if (!userIsAdmin) {
      // get current user group IDs
      const userGroupIds = Meteor.call(
        'getSingleUserGroupIds',
        userId
      );

      // get current user visible homes
      const homeIds = Homes.find({
        groupId: { $in: userGroupIds },
      }).map(home => home._id);

      // get homes active residency IDs
      selector.homeId = { $in: homeIds };
    }

    // determine whether to show departed residents
    if (!includeDeparted) {
      // Get residents without move out date
      selector.moveOut = {
        $exists: false,
      };
    }

    return Residencies.find(selector).map(residency => residency._id);
  },

  /*Check if the current resident has other residencies */
  hasOtherActiveResidencies({
    residentId,
    residencyId,
    moveOut,
    moveIn,
  }) {
    /* Move out date is set to 01-01-1970
    so need to check timestamp for validation  */
    const moveOutTimeStamp = new Date(moveOut).getTime();

    // Check for current resident
    let condition = { residentId };

    // Skip current residency -- edit mode
    if (residencyId) {
      condition._id = { $ne: residencyId };
    }

    let otherActiveResidencyDuringCurrent = {};
    if (moveOutTimeStamp > 0) {
      otherActiveResidencyDuringCurrent = buildConditionWhenMoveOutExists(
        {
          residentId,
          residencyId,
          moveOut,
          moveIn,
        }
      );
    } else {
      otherActiveResidencyDuringCurrent = buildConditionWhenMoveOutNotExists(
        moveIn
      );
    }
    condition = {
      ...condition,
      ...otherActiveResidencyDuringCurrent,
    };
    const activeResidencies = Residencies.find(condition).count();
    return activeResidencies > 0;
  },
  isResidentManagedByCurrentUser(residentId) {
    const userId = Meteor.userId();
    const isUserAdmin = Roles.userIsInRole(userId, ['admin']);

    if (isUserAdmin) return true;

    const residentInformation = Residencies.find({
      $and: [{ residentId }, { moveOut: { $exists: false } }],
    }).fetch();
    const homeId =
      residentInformation &&
      residentInformation[0] &&
      residentInformation[0].homeId;
    if (!homeId) return false;

    return Meteor.call('isHomeManagedByUser', { userId, homeId });
  },
  addNewResidencyWithExistingResident,
  editResidency
});
