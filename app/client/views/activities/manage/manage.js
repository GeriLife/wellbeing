Template.manageActivityButtons.helpers({
  activityDateIsWithinOneWeek: function () {
    // Get activity date from template data context
    var activityDate = moment(this.activityDate);

    // Get date seven days ago, for comparison
    var sevenDaysAgo = new moment().subtract(7, 'days');

    // Make sure activity date is within one week
    return activityDate.isAfter(sevenDaysAgo);
  }
});
