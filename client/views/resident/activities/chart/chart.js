Template.residentActivityChart.rendered = function () {
  // Get resident id
  var residentId = this.data._id;

  // Get resident name
  var residentName = this.data.firstName + " " + this.data.lastInitial;

  // Get the resident activities
  var activities = Residents.findOne(residentId).activities().fetch();

  //TODO: Make sure there can be multiple activities in a single day.

  MG.data_graphic({
    title: "Daily activity in minutes.",
    description: "Showing daily activity minutes for " + residentName,
    y_label: 'Minutes',
    y_rug: true,
    data: activities,
    interpolate: 'basic',
    missing_is_zero: true,
    area: false,
    full_width: true,
    height: 200,
    right: 40,
    target: document.getElementById('activity-chart'),
    x_accessor: 'activityDate',
    y_accessor: 'duration'
  });
}
