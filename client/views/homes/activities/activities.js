homeActivitiesData = function () {
  return Activities.find().fetch().map(function (activity) {
    return {
      residents: activity.residentNames(),
      type: activity.activityType(),
      duration: activity.duration
    }
  });
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
    }
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
