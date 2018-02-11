import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

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
    // Get a reference to the resident select field
    const residentSelect = $('[name=residentIds]');

    const select = new SlimSelect({
      select: '[name=residentIds]',
      placeholder: TAPi18n.__('newActivity-residentSelect-placeholder'),
      closeOnSelect: false,
    });
  }
});
