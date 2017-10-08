import 'select2';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';

Template.newActivity.created = function () {
  this.subscribe('allCurrentResidents');
  this.subscribe('allHomes');
  this.subscribe('allActivityTypes');
  this.subscribe('allRolesExceptAdmin');
};

Template.newActivity.helpers({
  select2Options () {
    // Get placeholder text localization
    const placeholderText = TAPi18n.__('newActivity-residentSelect-placeholder');

    const options = {
      closeOnSelect: false,
      placeholder: placeholderText,
    };

    return options;
  },
  'today': function () {
    // Default date today, as a string
    return Date();
  },
});
