Template.activitiesTableHomesCell.helpers({
  homeNames () {
    // Get reference to current activity
    const activity = this;

    // Get all unique resident IDs
    uniqueResidentIds = _.uniq(activity.residentIds);

    // Get home name for each unique resident ID
    const homeNames = _.map(uniqueResidentIds, function (residentId) {
      // Get resident
      const resident = Residents.findOne(residentId);

      // Get resident home name, padded with left space for display
      const homeName = ' ' + resident.homeName();

      return homeName;
    })

    // Return unique home names
    return _.uniq(homeNames);
  }
});
