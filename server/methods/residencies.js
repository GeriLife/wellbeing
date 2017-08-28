import newResidentAndResidencySchema from '/both/schemas/newResidentAndResidencySchema';

Meteor.methods({
  addNewResidentAndResidency (document) {
    console.log(document);
    // set up validation context based on new resident and residency schama
    const validationContext = newResidentAndResidencySchema.newContext();

    // Check if submitted document is valid
    const documentIsValid = validationContext.validate(document);

    if (documentIsValid) {
      // Get fields from object
      firstName = document.firstName;
      lastInitial = document.lastInitial;
      homeId = document.homeId;
      moveIn = document.moveIn;

      // Create new resident
      // TODO: migrate homeId out of resident schema
      const residentId = Residents.insert({ firstName, lastInitial, homeId });

      console.log(residentId);

      // Insert residency document
      const residencyId = Residencies.insert({ residentId, homeId, moveIn });

      if (residentId && residencyId) {
        // Submission was successful
        // TODO: determine more robust error checking
        return true;
      }
    }
  }
});
