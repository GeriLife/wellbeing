Template.dateCell.helpers({
  'formattedDate': function () {
    // Load the Finnish locale
    moment.locale('fi');

    // Create resident latest activity variable
    var activity = this;

    // Convert latest activity date to 'from now' format
    var activityDateFormatted = moment(activity.activityDate).fromNow();

    return activityDateFormatted;
  }
});
