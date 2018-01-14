import d3 from 'd3';
import moment from 'moment';
import 'moment/locale/fi';

Template.homeResidents.helpers({
  abbreviatedWeekday (date) {
    // Get user language
    const locale = TAPi18n.getLanguage();

    // Set locale based on user browser language
    moment.locale(locale);

    // Format the date to display abbreviated weekday in user language
    return moment(date).format('dd');
  },
  pastSevenDays () {
    // Get date seven days ago
    const sevenDaysAgo = moment().subtract(7, 'days').toDate();

    // Get array of past seven days including today
    const pastSevenDays = d3.utcDay.range(sevenDaysAgo, new Date());

    return pastSevenDays;
  }
});
