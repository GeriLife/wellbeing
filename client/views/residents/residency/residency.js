Template.residentCurrentResidency.onCreated(function () {
  // Get resident ID
  const residentId = this.residentId;

  console.log(this);
})


Template.residentCurrentResidency.events({
  'click .edit-residency' (event, templateInstance) {
    // Get resident and home ID
    const residentId = templateInstance.residentId;
    const homeId = templateInstance.homeId;

    // Show the edit residency modal
    Modal.show('editResidencyForm', { residentId, homeId });
  }
});
