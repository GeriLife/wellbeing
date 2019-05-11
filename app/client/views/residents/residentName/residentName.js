Template.residentName.onCreated(function() {
  const templateInstance = this;
  const residency = templateInstance.data;

  templateInstance.residency = new ReactiveVar(residency);
  if (residency.residentName === "unknown") {
    templateInstance.autorun(function() {
      templateInstance.subscribe("singleResident", residency.residentId);
    });
  }
});

Template.residentName.helpers({
  name() {
    const residency = Template.instance().residency.get();
    if (residency.residentName !== "unknown") return residency.residentName;
    const resident = Residents.findOne(residency.residentId);
    return resident ? resident.fullName() : "unknown";
  }
});
