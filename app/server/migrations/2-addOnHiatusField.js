Migrations.add({
  version: 2,
  name: 'Add "onHiatus" field to all residents, where none exists.',
  up: function() {
    // Get all residents without 'departed' field
    const residentsWithoutOnHiatusField = Residents.find({onHiatus: {$exists: false}});

    // Add departed field to residents without field, default to 'false'
    residentsWithoutOnHiatusField.forEach(resident => {
      // Add departed field to current resident, default to 'false'
      Residents.update(resident._id, {$set: {onHiatus: false}})
    });
  }
});
