Template.dateCell.helpers({
  'formattedDate': function () {
    // Load the Finnish locale
    //moment.locale('fi');
    
    // Create resident latest activity variable
    var residentLatestActivity = this;

    // Convert latest activity date to 'from now' format
    var latestActivityDate = moment(residentLatestActivity.latestActivityDate).fromNow();

    return latestActivityDate;
  }
});
