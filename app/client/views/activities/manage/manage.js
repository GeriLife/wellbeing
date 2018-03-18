import moment from 'moment';

Template.manageActivityButtons.helpers({
  activityDateIsWithinOneWeek () {
    // Get activity date from template data context
    const activityDate = moment(this.activityDate);

    // Get date seven days ago starting at end of current day, for comparison
    const sevenDaysAgo = new moment().endOf('day').subtract(7, 'days');

    // Make sure activity date is within one week
    return activityDate.isAfter(sevenDaysAgo);
  }
});
