Migrations.add({
  version: 3,
  name: "remove departed field from all residents.",
  up: function() {
    // Get all residents
    var residents = Residents.find().fetch();

    // Look at each resident record
    _.each(residents, function(resident) {
      // If undefined, add the field and set to 'false'
      Residents.update(resident, { $unset: { departed: true } });
    });
  }
});
