import FileSaver from 'file-saver';

Template.dataSettings.onCreated(function () {
  // Get reference to template instance
  const templateInstance = this;

  // 'fetching data' variable for UI state
  templateInstance.fetchingData = new ReactiveVar(false);

  templateInstance.isFileInvalid = new ReactiveVar(false);
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

  "change .file-upload-input": function(event, templateInstance){
    
    var file = event.currentTarget.files[0];
    if(file.type!=="application/json"){
      templateInstance.isFileInvalid.set(true);
      return
    } 
    var reader = new FileReader();
    
    reader.onload = function(fileLoadEvent) {
      console.log(reader.result)
       Meteor.call('file-upload', reader.result);
    };
    reader.readAsText(file);
 }

});

Template.dataSettings.helpers({
  fetchingData () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // return current value of 'fetchingData'
    return templateInstance.fetchingData.get();
  },

  isFileInvalid(){
    const templateInstance = Template.instance();
    return templateInstance.isFileInvalid.get();
  }
})
async function _readFileAndReturnJSON(file){
  fs.readFile(file)
}