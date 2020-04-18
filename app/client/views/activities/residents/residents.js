Template.activitiesTableResidentsCell.onCreated(function () {
  const instance = this;
  const uniqueResidentIds = _.uniq(this.data.residentIds);
  instance.residents = new ReactiveVar(null);

  Meteor.call(
    'getSelectedResidentDetails',
    uniqueResidentIds,
    function (err, residents) {
      if (!err) {
        instance.residents.set(residents);
      }
    }
  );
});

Template.activitiesTableResidentsCell.helpers({
  residentNames() {
    const residents = Template.instance().residents.get();

    return (residents || []).map(
      (resident) => resident.residentFullName
    );
  },
});
