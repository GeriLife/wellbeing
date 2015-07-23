homeActivitiesData = function () {
  //Get today's date.
  var today = new Date();

  // Get an array of activities for this home
  var homeActivities = Activities.find({'activityDate': {$lte: today}}).fetch();

  // Create a custom activities array using collection helpers for resident names, activity type, and time ago
  var homeActivitiesArray =homeActivities.map(function (activity) {
    return {
      residents: activity.residentNames(),
      type: activity.activityType(),
      duration: activity.duration,
      timeAgo: activity.timeAgo()
    }
  });

  return homeActivitiesArray;
};

var optionsObject = {
  columns: [
    {
      title: 'Residents',
      data: 'residents',
      className: 'residentsColumn'
    },
    {
      title: 'Activity Type',
      data: 'type',
      className: 'activityTypeColumn'
    },
    {
      title: 'Duration',
      data: 'duration',
      className: 'nameColumn'
    },
    {
      title: 'Time Ago',
      data: 'timeAgo',
      className: 'activityTimeAgoColumn'
    },
  ]
};

Template.homeActivities.created = function () {
  // Get the home id from data context
  var homeId = this.data._id;

  // Subscribe to all activities for residents of this home
  this.subscribe('homeActivities', homeId);
};

Template.homeActivities.helpers({
  'homeActivitiesFunction': function () {
    return homeActivitiesData;
  },
  'options': function () {
    return optionsObject;
  }
});
