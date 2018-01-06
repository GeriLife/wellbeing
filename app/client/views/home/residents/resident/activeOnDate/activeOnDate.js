Template.homeResidentActiveOnDate.onCreated(function () {
  const templateInstance = this;

  // Get resident ID and date from template data context
  const residentId = this.data.resident._id;
  const date = this.data.day;

  // Create ISO date string (YYYY-mm-dd) from date
  const isoYMD = moment(date).format('YYYY-mm-dd');

  // Create string to request activity count for resident ID and current date (YMD)
  const countName = `residentId-${ residentId }-activityCountOn-${ isoYMD }`;

  // Subscribe to resident activity count for current date
  templateInstance.subscribe('residentActivityCountOnDate', residentId, date);

  // Create reactive variable to hold resident activity count
  templateInstance.residentActivityCountOnDate = new ReactiveVar();

  templateInstance.autorun(function () {
    // Get count of activities for resident ID and current date (see above)
    const activityCount = Counts.get(countName);

    // Set activity count to template reactive variable
    templateInstance.residentActivityCountOnDate.set(activityCount);
  })
});

Template.homeResidentActiveOnDate.helpers({
  residentActiveOnDate () {
    // Get reference to template instance
    const templateInstance = Template.instance();

    // Residents are inactive by default, until there is a known activity count
    let residentActiveOnDate = false;

    // Get activity count, from reactive variable
    const activityCount = templateInstance.residentActivityCountOnDate.get();

    // If resident has activity count, they are considered active on date
    if (activityCount > 0) {
      residentActiveOnDate = true;
    }

    return residentActiveOnDate;
  }
})
