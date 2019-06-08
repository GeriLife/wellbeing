import newResidentAndResidencySchema from "/both/schemas/newResidentAndResidencySchema";

Meteor.methods({
  addNewResidentAndResidency(document) {
    // set up validation context based on new resident and residency schama
    const validationContext = newResidentAndResidencySchema.newContext();

    // Check if submitted document is valid
    const documentIsValid = validationContext.validate(document);

    if (documentIsValid) {
      // Get fields from object
      const { firstName, lastInitial, homeId, moveIn } = document;

      // Create new resident
      // TODO: migrate homeId out of resident schema
      const residentId = Residents.insert({ firstName, lastInitial, homeId });

      if (residentId) {
        // Insert residency document
        const residencyId = Residencies.insert({ residentId, homeId, moveIn });

        if (residencyId) {
          // Submission was successful
          return true;
        } else {
          // Could not create residency
          throw new Meteor.Error(
            "could-not-create-residency",
            "Could not create residency."
          );
        }
      } else {
        // Could not create resident
        throw new Meteor.Error(
          "could-not-create-resident",
          "Could not create resident."
        );
      }
    } else {
      // Document is not valid
      throw new Meteor.Error(
        "resident-and-residency-invalid",
        "Resident and residency document is not valid."
      );
    }
  },
  getCurrentResidencies() {
    return Residencies.find({
      moveOut: {
        $exists: false
      }
    }).fetch();
  },
  getUserVisibleResidencyIds(userId, includeDeparted) {
    const selector = {};

    const userIsAdmin = Roles.userIsInRole(userId, "admin");

    // Admin should see all residencies
    // otherwise, check user group permissions
    if (!userIsAdmin) {
      // get current user group IDs
      const userGroupIds = Meteor.call("getSingleUserGroupIds", userId);

      // get current user visible homes
      const homeIds = Homes.find({ groupId: { $in: userGroupIds } }).map(
        home => home._id
      );

      // get homes active residency IDs
      selector.homeId = { $in: homeIds };
    }

    // determine whether to show departed residents
    if (!includeDeparted) {
      // Get residents without move out date
      selector.moveOut = {
        $exists: false
      };
    }

    return Residencies.find(selector).map(residency => residency._id);
  },

  /*Check if the current resident has other residencies */
  hasOtherActiveResidencies({ residentId, residencyId, moveOut, moveIn }) {
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
      otherActiveResidencyDuringCurrent = buildConditionWhenMoveOutExists({
        residentId,
        residencyId,
        moveOut,
        moveIn
      });
    } else {
      otherActiveResidencyDuringCurrent = buildConditionWhenMoveOutNotExists({
        residentId,
        residencyId,
        moveOut,
        moveIn
      });
    }
    condition = { ...condition, ...otherActiveResidencyDuringCurrent };
    const activeResidencies = Residencies.find(condition).count();
    console.log(condition,activeResidencies,Residencies.find(condition).fetch())
    return activeResidencies > 0;
  }
});

function buildConditionWhenMoveOutExists({
  residentId,
  residencyId,
  moveOut,
  moveIn
}) {
  const otherActiveResidencyDuringCurrent = {
    $or: []
  };

  //If a residency starts or end during cuurrent
  /* 
  Existing Residnecy => |------
  Current Record => o------
  Cases:
  |-------------|   |--------------|
                 |--|
        o----------------------o  
  */
  otherActiveResidencyDuringCurrent["$or"].push({
    $or: [
      {
        $and: [{ moveOut: { $gte: moveIn } }, { moveOut: { $lte: moveOut } }]
      },
      {
        $and: [{ moveIn: { $gte: moveIn } }, { moveIn: { $lte: moveOut } }]
      }
    ]
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
  otherActiveResidencyDuringCurrent["$or"].push({
    $and: [
      { moveIn: { $lt: moveOut } },
      {
        $or: [{ moveOut: { $gte: moveOut } }, { moveOut: { $exists: false } }]
      }
    ]
  });
  return otherActiveResidencyDuringCurrent;
}

function buildConditionWhenMoveOutNotExists({
  residentId,
  residencyId,
  moveOut,
  moveIn
}) {
  const otherActiveResidencyDuringCurrent = {
    $or: []
  };
  // If a residency ends after this moveIn
  /* 
  Existing Residnecy => |------
  Current Record => o------
  Cases:
  |------------------|
      o-----------------------  
  */
  otherActiveResidencyDuringCurrent["$or"].push({
    moveOut: { $gt: moveIn }
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
  otherActiveResidencyDuringCurrent["$or"].push({
    moveIn: { $gte: moveIn }
  });

  // If there already exists an active residency
  /* 
  Existing Residnecy => |------
  Current Record => o------
  Cases:
  |----------------------
      o-----------------------  
  */
  otherActiveResidencyDuringCurrent["$or"].push({
    $and: [
      {
        moveIn: { $lte: moveIn }
      },
      {
        moveOut: { $exists: false }
      }
    ]
  });
  return otherActiveResidencyDuringCurrent;
}