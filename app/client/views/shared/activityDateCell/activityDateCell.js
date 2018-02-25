import moment from 'moment';

Template.activityDateCell.helpers({
  'formattedDate': function () {
    // Get client locale
    const clientLocale = TAPi18n.getLanguage();

    // Load the client locale into Moment
    moment.locale(clientLocale);

    // Create resident latest activity variable
    var activity = this;

    // Convert latest activity date to 'from now' format
    var activityDateFormatted = moment(activity.activityDate).fromNow();

    return activityDateFormatted;
  }
});
