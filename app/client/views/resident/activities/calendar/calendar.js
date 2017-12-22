Template.activityCalendar.rendered = function () {
  // Get reference to template instance
  const instance = this;

  // Update the calendar when instance data changes
  instance.autorun(function () {
    // Empty the Activity Calendar container element, in case of re-render
    $("#activity-calendar-container").empty();

    const residentActivities = Template.currentData().activities;

    // Group activities by activity date
    const nestedActivities = d3.nest()
      .key(function (activity) {
        return activity.activityDate;
      });

    // Get a sum of activities
    const summedActivities = nestedActivities.rollup(function (activity) {
        return {
          duration: d3.sum(activity, function (activity) {
            return activity.duration;
          })
        }
      })
      .entries(residentActivities);

      summedActivities.map(function (activity) {
        // Create date and duration attributes with proper data types
        activity.timestamp = new Date(activity.key).getTime();
        activity.duration = parseInt(activity.values.duration);

        // Delete unused key and values
        delete activity.values
        delete activity.key;
      });

    const activityMapTitle = TAPi18n.__("resident-activityCalendar-title") + " ";

    // Set up the activity map graphic
    const activityMap = new ActivityMap(summedActivities, {
      "id": "activity-calendar",
      "parent": "#activity-calendar-container",
      "fit": true,
      "title": activityMapTitle,
      "timeColumn": "timestamp",
      "valueColumn": "duration",
      "compact": false
    });

    // Trying to figure out how to re-render the data
    activityMap.process();

    // Render the activity calendar
    activityMap.render();
  });
};
