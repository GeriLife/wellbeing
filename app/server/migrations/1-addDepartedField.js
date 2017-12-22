Migrations.add({
  version: 1,
  name: "Add departed field to all residents.",
  up: function () {
    // Get all residents
    var residents = Residents.find().fetch();

    // Look at each resident record
    _.each(residents, function (resident) {
      // Check if 'departed' is undefined
      if (_.isUndefined(resident.departed)) {
        // If undefined, add the field and set to 'false'
        Residents.update(resident, {$set: {departed: false}});
      }
    })
  }
});
