import newResidentAndResidencySchema from '/both/schemas/newResidentAndResidencySchema';

Meteor.methods({
  addNewResidentAndResidency (document) {
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
            'could-not-create-residency',
            'Could not create residency.'
          )
        }
      } else {
        // Could not create resident
        throw new Meteor.Error(
          'could-not-create-resident',
          'Could not create resident.'
        )
      }
    } else {
      // Document is not valid
      throw new Meteor.Error(
        'resident-and-residency-invalid',
        'Resident and residency document is not valid.'
      )
    }
  },
  getCurrentResidencies () {
    return Residencies.find({
      moveOut: {
        $exists: false,
      }
    }).fetch();
  }
});
