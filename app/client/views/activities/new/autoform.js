import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.min.css';

AutoForm.addHooks(['newActivityForm'], {
  'onSuccess': function () {
    // Hide the modal dialogue
    Modal.hide('newActivity');

    const successMessage = TAPi18n.__("newActivity-success");

    const successMessageWithIcon = '<i class="fa fa-check"></i> ' + successMessage

    // Alert user that activity was added
    FlashMessages.sendSuccess(successMessageWithIcon);
  }
});

Template.autoForm.onRendered(function () {
  const instance = this;

  // Make sure the new activity form is being rendered
  if (instance.data.id === "newActivityForm") {
    // Get localized placeholder text
    const placeholder = TAPi18n.__('newActivity-residentSelect-placeholder');

    // Render multi-select widget on 'select residents' field
    new SlimSelect({
      select: '[name=residentIds]',
      closeOnSelect: false,
      placeholder,
    });
  }
});
