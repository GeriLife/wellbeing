Template.residentCurrentResidency.onCreated(function () {
  // Get resident ID
  const residentId = this.residentId;
})


Template.residentCurrentResidency.events({
  'click .edit-residency' (event, templateInstance) {
    // Get resident and home IDs from template instance data
    const { residentId, homeId } = templateInstance.data;

    // Show the edit residency modal
    Modal.show('editResidencyModal', { residentId, homeId });
  }
});
