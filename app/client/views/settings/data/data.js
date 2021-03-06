import FileSaver from "file-saver";
import xlsUtils from './exportAsXls';

const _clear = templateInstance => {

  templateInstance.isRespError.set(false);
  templateInstance.respMessage.set(null);
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
  templateInstance.file = new ReactiveVar(null);
  templateInstance.isRespError = new ReactiveVar(false);
  templateInstance.respMessage = new ReactiveVar(null);
  templateInstance.importRes = new ReactiveVar(null);
  templateInstance.showModal = new ReactiveVar(false);
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

  'click #export-data-xls'(event, templateInstance) {
    // Set 'fetching data' variable to true
    templateInstance.fetchingData.set(true);

    // Export all data
    Meteor.call('exportAllData', function (error, exportData) {
      if (
        !error &&
        exportData &&
        Object.keys(exportData).length > 0
      ) {
        const xlsData = xlsUtils.convertToXls(exportData);
        const exportBlob = new Blob([xlsData], {
          type: 'application/octet-stream',
        });
        FileSaver.saveAs(exportBlob, 'GeriLife-export.xlsx');

        templateInstance.fetchingData.set(false);
        return null;
      }

      templateInstance.fetchingData.set(false);
      FlashMessages.sendError(
        `<i class="fa fa-warning"></i> ${
          !error
            ? TAPi18n.__('dataSettings-export-noData')
            : error.message || error
        }`,
        { autoHide: true, hideDelay: 3000 }
      );
    });
  },

  "change .file-upload-input": function(event, templateInstance) {
    templateInstance.showModal.set(false);
    const file = event.currentTarget.files[0];
    templateInstance.file.set(file);
    if (file.type !== "application/json") {
      templateInstance.isFileInvalid.set(true);
    } else {
      templateInstance.isFileInvalid.set(false);
    }
  },

  "click #importData": function(event, templateInstance) {
    let reader = new FileReader();

    reader.onload = function(fileLoadEvent) {
      Meteor.call("JSONFileImport", reader.result, function(err, data) {
        if (Array.isArray(data)) {
          templateInstance.showModal.set(true);
          templateInstance.importRes.set(data);
        } else if ("error" in data) {
          templateInstance.isRespError.set(true);
          templateInstance.respMessage.set(data.error.message);

          /* This will clear the error message alert after 6seconds if not cleared by the user */
          setTimeout(
            () => {
              _clear(templateInstance);
            },
            6000,
            templateInstance
          );
        }
      });
    };
    reader.readAsText(templateInstance.file.get());
  },
  "click #clear": function(event, templateInstance) {
    _clear(templateInstance);
  },

  "click #closeImportErrAlert": function(event, templateInstance) {
    _clear(templateInstance);
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
    return templateInstance.isFileInvalid.get();
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

  ifFileExists(file) {
    return !!file;
  },

  isRespError() {
    const templateInstance = Template.instance();
    return templateInstance.isRespError.get();
  },

  respMessage() {
    const templateInstance = Template.instance();
    return templateInstance.respMessage.get();
  },

  showModal() {
    const templateInstance = Template.instance();
    return templateInstance.showModal.get();
  },

  importRes() {
    const templateInstance = Template.instance();
    return templateInstance.importRes.get();
  }
});
