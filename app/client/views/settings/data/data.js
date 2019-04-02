import FileSaver from "file-saver";

const showAlert = () => {
  const templateInstance = Template.instance();
  templateInstance.shouldShowAlert.set(true);

  setTimeout(() => {
    templateInstance.shouldShowAlert.set(false);
  }, 3000);
};

const _clear = () => {
  const templateInstance = Template.instance();

  templateInstance.file.set(null);
  templateInstance.isFileInvalid.set(false);

  document.getElementById("inputFile").value = "";
};

Template.dataSettings.onCreated(function() {
  // Get reference to template instance
  const templateInstance = this;

  // 'fetching data' variable for UI state
  templateInstance.fetchingData = new ReactiveVar(false);

  templateInstance.isFileInvalid = new ReactiveVar(false);
  templateInstance.shouldShowAlert = new ReactiveVar(false);
  templateInstance.file = new ReactiveVar(null);
  templateInstance.isRespError = new ReactiveVar(false);
  templateInstance.respMessage = new ReactiveVar(null);
});

Template.dataSettings.events({
  "click #export-data"(event, templateInstance) {
    // Set 'fetching data' variable to true
    templateInstance.fetchingData.set(true);

    // Export all data
    Meteor.call("exportAllData", function(error, exportData) {
      if (!error) {
        // Convert export data to string
        const dataString = JSON.stringify(exportData);

        // Create binary object from data string
        const exportBlob = new Blob([dataString], {
          type: "application/json;charset=utf-8"
        });

        // Trigger save as prompt
        FileSaver.saveAs(exportBlob, "GeriLife-export.json");

        // hide spinner
        templateInstance.fetchingData.set(false);
      }
    });
  },

  "change .file-upload-input": function(event, templateInstance) {
    let file = event.currentTarget.files[0];
    templateInstance.file.set(file);
    if (file.type !== "application/json") {
      showAlert();
      templateInstance.isFileInvalid.set(true);

      return;
    }
    templateInstance.isFileInvalid.set(false);
  },

  "click #importData": function(event, templateInstance) {
    let reader = new FileReader();

    reader.onload = function(fileLoadEvent) {
      Meteor.call("JSONFileImport", reader.result, function(err, data) {

        if(Array.isArray(data)) {
        templateInstance.showModal.set(true)

        }else{
          if (!!data.error) {
            templateInstance.isRespError.set(true);
            templateInstance.respMessage.set(data.error.message);
          } else templateInstance.respMessage.set(data.message);
  
          setTimeout(() => {
            templateInstance.isRespError.set(false);
            templateInstance.respMessage.set(null);
            _clear();
          },6000); 
        }
        
      });
    };
    reader.readAsText(templateInstance.file.get());
  },
  "click #clear": function(event, templateInstance) {
    _clear();
  }
});

Template.dataSettings.helpers({
  fetchingData() {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // return current value of 'fetchingData'
    return templateInstance.fetchingData.get();
  },

  isFileInvalid() {
    const templateInstance = Template.instance();
    return templateInstance.isFileInvalid.get();
  },

  shouldShowAlert() {
    const templateInstance = Template.instance();
    return templateInstance.shouldShowAlert.get();
  },

  file() {
    const templateInstance = Template.instance();
    return templateInstance.file.get();
  },

  isDisabled() {
    const templateInstance = Template.instance();
    return !(
      templateInstance.isFileInvalid.get() || !templateInstance.file.get()
    );
  },

  notnotA(a) {
    return !!a;
  },

  isRespError() {
    const templateInstance = Template.instance();

    return templateInstance.isRespError.get();
  },
  respMessage() {
    const templateInstance = Template.instance();

    return templateInstance.respMessage.get();
  }
});
