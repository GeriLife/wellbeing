Template.groupModal.helpers({
  formType () {
    // Get group from template data context
    const group = this.group;

    // Placeholder for formType
    let formType

    // Check if group was passed in to template
    if (group) {
      // update existing group
      formType = 'method-update';
    } else {
      // insert new group
      formType = 'method';
    }

    return formType;
  }
});
