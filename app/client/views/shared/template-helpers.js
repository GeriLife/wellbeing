import moment from 'moment';

Template.registerHelper("timeAgo", function (date) {
  // Format the date as a 'time ago'
  var timeAgo = moment(date).fromNow();

  return timeAgo;
});
