import newResidentAndResidencySchema from '/both/schemas/newResidentAndResidencySchema';
import { checkUserPermissions } from '/both/utils';
import { hasOtherActiveResidencies } from '../utils/residencies';

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
    throw new Meteor.Error(500, 'Operation is not allowed');
  }

  if (
    hasOtherActiveResidencies({
      _id: null,
      modifier: residencyInfo,
    })
  ) {
    throw new Meteor.Error(500, 'This user already has an active residency');

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
    throw new Meteor.Error(500, 'Operation not allowed');
  }

  if (hasOtherActiveResidencies({ _id, modifier })) {
    throw new Meteor.Error(
      500,
      'This user already has an active residency'
    );
  }

  return Residencies.update({ _id }, modifier);
}

function buildConditionWhenMoveOutExists({ moveOut, moveIn }) {
  /*
   Existing Residency => |------
  Current Record => o------
  */
  return {
    $or: [
      /*
      Cases covered:
               |---|
               |---------
               |------|
            o-------o
      */
      {
        $and: [
          { moveIn: { $lt: moveOut } },
          { moveIn: { $gt: moveIn } },
        ],
      },
      {
        /*
      Cases covered:
        |------|
        |--------
        |-----------------|
          |-----------|
          o-----------o
        */
        $and: [
          { moveIn: { $lte: moveIn } },
          {
            $or: [
              { moveOut: { $exists: false } },
              { moveOut: { $gt: moveIn } },
            ],
          },
        ],
      },
    ],
  };
}

function buildConditionWhenMoveOutNotExists(moveIn) {
  /*
   Existing Residency => |------
  Current Record => o------
  */

  return {
    $or: [
      /*
      Cases covered:
               |---------
               |------|
            o---------
      */
      { moveIn: { $gt: moveIn } },
      {
        /*
      Cases covered:
               |---------
               |------|
                  o-------o
                  |---
                  |---|
      */
        $and: [
          { moveIn: { $lte: moveIn } },
          {
            $or: [
              { moveOut: { $exists: false } },
              { moveOut: { $gt: moveIn } },
            ],
          },
        ],
      },
    ],
  };
}

function getResidentsWithHomeAndResidentDetails(includeDeparted) {
  const groupsManagedByCurrentUser = (
    Meteor.call('getGroupsManagedByCurrentUser') || []
  ).map((group) => {
    return group.groupId;
  });

  const selector = {};
  const currentUserIsAdmin = Roles.userIsInRole(
    Meteor.userId(),
    'admin'
  );

  if (!currentUserIsAdmin) {
    const userVisibleHomeIds = Meteor.call(
      'getUserVisibleHomeIds',
      userId
    );
    selector.homeId = { $in: userVisibleHomeIds };
  }

  if (!includeDeparted) {
    // non-departed residents should not have move out date
    selector.moveOut = {
      $exists: false,
    };
  }
  const residencies = Residencies.find(selector)

  // Iterate through residents
  // set full name and home name from collection helpers
  return {
    managesAGroup:
      currentUserIsAdmin || groupsManagedByCurrentUser.length > 0,
    residencies: residencies.map(function (residency) {
      let residentName = 'unknown';
      let homeName = 'unknown';
      let canEdit = false;
      const hasUserDeparted = 'moveOut' in residency;

      const resident = Residents.findOne(residency.residentId);
      const home = Homes.findOne(residency.homeId);
      const isHomeInUserManagedGroups =
        groupsManagedByCurrentUser.indexOf(home.groupId) > -1;

      if (
        currentUserIsAdmin ||
        (isHomeInUserManagedGroups && !hasUserDeparted)
      ) {
        canEdit = true;
      }
      if (resident) {
        residentName = resident.fullName();
      }

      if (home) {
        homeName = home.name;
      }
      return {
        ...residency,
        residentName,
        homeName,
        canEdit,
      };
    }),
  };
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

    console.log(JSON.stringify(condition, 2, null), 'condition');
    console.log(Residencies.find(condition).fetch());
    console.log('-------------end-------------');
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
  editResidency,
  getResidentsWithHomeAndResidentDetails
});
