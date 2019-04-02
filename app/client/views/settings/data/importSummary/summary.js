
Template.importSummary.onCreated(function() {
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
  