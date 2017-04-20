Template.activitiesTableResidentsCell.helpers({
  residentNames () {
    // Get reference to current activity
    const activity = this;

    // Get all unique resident IDs
    uniqueResidentIds = _.uniq(activity.residentIds);

    // Get resident name for each unique resident ID
    const residentNames = _.map(uniqueResidentIds, function (residentId) {
      // Get resident
      const resident = Residents.findOne(residentId);

      // Get resident full name, padded with left space for display
      const residentName = ' ' + resident.fullName();

      return residentName;
    })

    return residentNames;
  }
});
