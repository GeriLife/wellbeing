import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.min.css";

AutoForm.addHooks(["newFeelingForm"], {
  onSuccess: function() {
    // Hide the modal dialogue
    /*
    adding timeout here so that there is 
    enough time for the user to read the success message
     */
    setTimeout(function () {
      Modal.hide("newFeeling");
    }, 2500)
    // Get success message translation
    const successMessage = TAPi18n.__("newFeeling-success");

    // Alert user that feeling was recorded
    FlashMessages.sendSuccess('<i class="fa fa-check"></i> ' + successMessage);
  }
});

Template.autoForm.onRendered(function() {
  const templateInstance = this;

  // Make sure the new activity form is being rendered
  if (templateInstance.data.id === "newFeelingForm") {
    // Get localized placeholder text
    const placeholder = TAPi18n.__("activityForm-residentSelect-placeholder");

    // Render multi-select widget on 'select resident' field
    new SlimSelect({
      select: "[name=residentId]",
      closeOnSelect: true,
      placeholder
    });
  }
});
