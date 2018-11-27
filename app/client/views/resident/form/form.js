Template.residentForm.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // Check whether residentId was passed in to template data context
  if (templateInstance.data && templateInstance.data.residentId) {
    // Get resident ID
    const residentId = templateInstance.data.residentId;

    // Subscribe to single resident, based on Resident ID
    templateInstance.subscribe('singleResident', residentId);
  }
});

Template.residentForm.helpers({
  formType () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Placeholder for form type
    let formType;

    // Check whether residentId was passed in to template data context
    if (templateInstance.data && templateInstance.data.residentId) {
      formType = 'update';
    } else {
      formType = 'insert';
    }

    return formType;
  },
  resident () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Check whether residentId was passed in to template data context
    if (templateInstance.data && templateInstance.data.residentId) {
      // Get resident ID
      const residentId = templateInstance.data.residentId;

      // Get resident document
      const resident = Residents.findOne(residentId);

      return resident;
    }
  }
});
