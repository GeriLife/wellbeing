import FileSaver from 'file-saver';

Template.dataSettings.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // 'fetching data' variable for UI state
  templateInstance.fetchingData = new ReactiveVar(false);
});

Template.dataSettings.events({
  'click #export-data' (event, templateInstance) {
    // Set 'fetching data' variable to true
    templateInstance.fetchingData.set(true);

    // Export all data
    Meteor.call('exportAllData', function (error, exportData) {
      if (!error) {
        // Convert export data to string
        const dataString = JSON.stringify(exportData)

        // Create binary object from data string
        const exportBlob = new Blob([dataString], {type: 'application/json;charset=utf-8'});

        // Trigger save as prompt
        FileSaver.saveAs(exportBlob, 'GeriLife-export.json');

        // hide spinner
        templateInstance.fetchingData.set(false);
      }
    });
  },
});

Template.dataSettings.helpers({
  fetchingData () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // return current value of 'fetchingData'
    return templateInstance.fetchingData.get();
  }
})
