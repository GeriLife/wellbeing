Migrations.add({
    version: 4,
    name: "Remove homeId from residents schema.",
    up: function() {
      // Get all residents
      var residents = Residents.find().fetch();
  
      // Look at each resident record
      _.each(residents, function(resident) {
        // If undefined, add the field and set to 'false'
        Residents.update(resident, { $unset: { homeId: true } });
      });
    }
  });
  