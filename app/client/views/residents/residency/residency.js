Template.residentCurrentResidency.events({
  'click .edit-residency' (event, templateInstance) {
    // Get residency from template instance data
    const residency = templateInstance.data;

    // Show the edit residency modal
    Modal.show('editResidencyModal', { residency });
  }
});

Template.residentCurrentResidency.helpers({
  userCanEdit() {
    const templateInstance = Template.instance();
    return templateInstance.data.canEdit
  }
})