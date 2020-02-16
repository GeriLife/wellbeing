import d3 from 'd3';

Template.activityCalendar.rendered = function() {
  // Get reference to template instance
  const instance = this;

  // Update the calendar when instance data changes
  instance.autorun(function() {
    // Empty the Activity Calendar container element, in case of re-render
    $('#activity-calendar-container').empty();

    const residentId = instance.data.residentId;
    Meteor.call('getDaywiseActivityDuration', residentId, function(
      error,
      summedActivities
    ) {
      const activityMapTitle =
        TAPi18n.__('resident-activityCalendar-title') + ' ';

      // Set up the activity map graphic
      const activityMap = new ActivityMap(summedActivities, {
        id: 'activity-calendar',
        parent: '#activity-calendar-container',
        fit: true,
        title: activityMapTitle,
        timeColumn: 'timestamp',
        valueColumn: 'duration',
        compact: false,
      });

      // Trying to figure out how to re-render the data
      activityMap.process();

      // Render the activity calendar
      activityMap.render();
    });
  });
};
