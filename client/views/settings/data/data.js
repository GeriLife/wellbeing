import FileSaver from 'file-saver';

Template.dataSettings.events({
  'click #export-data' () {
    // Export all data
    Meteor.call('exportAllData', function (error, exportData) {
      if (!error) {
        // Convert export data to string
        const dataString = JSON.stringify(exportData)

        // Create binary object from data string
        const exportBlob = new Blob([dataString], {type: 'application/json;charset=utf-8'});

        // Trigger save as prompt
        FileSaver.saveAs(exportBlob, 'GeriLife-export.json');
      }
    });
  },
  'click #generate-demo-data' () {
    // Create demo data via server method
    Meteor.call('createMockData');
  }
});
