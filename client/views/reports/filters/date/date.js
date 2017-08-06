Template.reportsFiltersDate.onCreated(function () {
  // get reference to template instance
  const instance = this;

  // placeholder for date of oldest activity
  instance.oldestActivityDate = new ReactiveVar();

  // Get date for oldest activity
  Meteor.call('getOldestActivityDate', function (error, oldestActivityDate) {
    console.log(oldestActivityDate);
    instance.oldestActivityDate.set(oldestActivityDate);
  })
});
