Template.dataSettings.events({
  'click #export-data' () {
    // Export all data
    Meteor.call('exportAllData', function (error, exportData) {
      if (!error) {
        console.log(exportData);
      }
    });
  },
  'click #generate-demo-data' () {
    // Create demo data via server method
    Meteor.call('createMockData');
  }
});
