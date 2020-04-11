Template.residentName.onCreated(function () {
  const templateInstance = this;
  const residency = templateInstance.data;

  templateInstance.residency = new ReactiveVar(residency);
  templateInstance.resident = new ReactiveVar(null);

  if (residency.residentName === 'unknown') {
    templateInstance.autorun(function () {
      Meteor.call(
        'getResidentDetails',
        residency.residentId,
        function (err, details) {
          templateInstance.resident.set(details);
        }
      );
    });
  }
});

Template.residentName.helpers({
  name() {
    const residency = Template.instance().residency.get();
    if (residency.residentName !== 'unknown')
      return residency.residentName;
    const resident = Template.instance().residency.get();
    return resident
      ? [resident.firstName, resident.lastInitial].join(' ')
      : 'unknown';
  },
});
