import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.min.css';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import moment from 'moment';

AutoForm.addHooks(['activityForm'], {
  'onSuccess': function (formType) {
    // Hide the modal dialogue
    Modal.hide('activityForm');

    // placeholder for success message text
    let successMessage;

    // Get relevant success message for form type
    if (formType === 'update') {
      successMessage = TAPi18n.__("activityForm-update-success");
    } else {
      successMessage = TAPi18n.__("activityForm-add-success");
    }

    const successMessageWithIcon = '<i class="fa fa-check"></i> ' + successMessage

    // Alert user that activity was added
    FlashMessages.sendSuccess(successMessageWithIcon);
  }
});

Template.autoForm.onRendered(function () {
  const instance = this;

  // Make sure the new activity form is being rendered
  if (instance.data.id === "activityForm") {
    // Get localized placeholder text
    const placeholder = TAPi18n.__('activityForm-residentSelect-placeholder');

    // Render multi-select widget on 'select residents' field
    new SlimSelect({
      select: '[name=residentIds]',
      closeOnSelect: false,
      placeholder,
    });

    // Render cross-platform date picker on date field
    flatpickr("#activityDate", {
      minDate: moment().subtract(7, 'days').startOf('day').toDate(),
      maxDate: moment().endOf('day').toDate(),
    });
  }
});
